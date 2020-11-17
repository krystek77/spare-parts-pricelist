import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth, dataBase, storage, firebase } from '../lib/firebase';
import {
  MainContainer,
  MenuContainer,
  NavigationContainer,
  SidebarContainer,
  TitlePageContainer,
} from '../containers';
import { Navigation, Form } from '../components';
import { useAuth } from '../hooks';
import * as ROUTES from '../constants/routes';
import {
  checkLength,
  emailValidation,
  isPhoneNumber,
  passwordValidation,
} from '../helpers';
import { useSelectedPriceListsContextValue } from '../context';

interface IUserPage {}
export const EditAdminPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const history = useHistory();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

  const [nick, setNick] = React.useState<string>(authUser.nick);
  const [country, setCountry] = React.useState<string>(authUser.country);
  const [city, setCity] = React.useState<string>(authUser.city);
  const [mobile, setMobile] = React.useState<string>(authUser.mobile);
  const [uploadedFile, setUploadedFile] = React.useState<FileList | null>(null);
  const [avatar] = React.useState<string>(authUser.avatar);
  const [message, setMessage] = React.useState<string>('');

  const [currentEmail, setCurrentEmail] = React.useState<string>(
    authUser.email
  );
  const [newEmail, setNewEmail] = React.useState<string>('');
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [isUpdateEmail, setIsUpdateEmail] = React.useState<boolean>(false);

  //TODO: validation data
  let isValidForm =
    checkLength(nick, 4, 8) &&
    checkLength(country, 4, 20) &&
    checkLength(city, 4, 20) &&
    isPhoneNumber(mobile);
  if (isUpdateEmail) {
    isValidForm =
      checkLength(nick, 4, 8) &&
      checkLength(country, 4, 20) &&
      checkLength(city, 4, 20) &&
      isPhoneNumber(mobile) &&
      emailValidation(currentEmail) &&
      emailValidation(newEmail) &&
      passwordValidation(currentPassword);
  }

  const handleUpdateProfileUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const updatedUserData = {
      nick,
      country,
      city,
      mobile,
      email: currentEmail,
      avatar,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };

    const file = uploadedFile && uploadedFile[0];

    if (!!file) {
      const storageRef = storage.ref(`assets/images/${file?.name}`);
      const name = storageRef.name;
      const uploadTask = storageRef.put(file);

      if (isUpdateEmail) {
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );
        user
          ?.reauthenticateWithCredential(credential)
          .then((result) => {
            return result.user?.updateEmail(newEmail);
          })
          .then(() => {
            updatedUserData.email = newEmail;

            uploadTask.on(
              'state_changed',
              null,
              function (error) {
                switch (error.code) {
                  case 'storage/unauthorized':
                    setMessage(
                      'You does not have permission to access the object'
                    );
                    setTimeout(() => {
                      setMessage('');
                    }, 500);
                    break;
                  case 'storage/canceled':
                    setMessage('You canceled the upload');
                    setTimeout(() => {
                      setMessage('');
                    }, 500);
                    break;
                  case 'storage/unknown':
                    setMessage('Unknow error occurred');
                    setTimeout(() => {
                      setMessage('');
                    }, 500);
                    break;
                  default:
                    setMessage('Some error occurred');
                    setTimeout(() => {
                      setMessage('');
                    }, 500);
                    break;
                }
              },
              () => {
                uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then(function (downloadURL) {
                    setMessage(`Upload file: ${name} completed successfully`);
                    setTimeout(() => {
                      setMessage('');
                    }, 500);
                    // setAvatar(downloadURL);
                    updatedUserData.avatar = downloadURL;
                    return dataBase
                      .collection('users')
                      .doc(authUser.userID)
                      .update(updatedUserData);
                  })
                  .then(() => {
                    setMessage('User profile and account updated successfully');
                    setTimeout(() => {
                      setMessage('');
                      history.push(ROUTES.ADMIN_PROFILE);
                    }, 500);
                  })
                  .catch((error) => {
                    setMessage(error.message);
                  });
              }
            );
          })
          .catch((error) => {
            setMessage(error.message);
          });
      } else {
        uploadTask.on(
          'state_changed',
          null,
          function (error) {
            switch (error.code) {
              case 'storage/unauthorized':
                setMessage('You does not have permission to access the object');
                setTimeout(() => {
                  setMessage('');
                }, 500);
                break;
              case 'storage/canceled':
                setMessage('You canceled the upload');
                setTimeout(() => {
                  setMessage('');
                }, 500);
                break;
              case 'storage/unknown':
                setMessage('Unknow error occurred');
                setTimeout(() => {
                  setMessage('');
                }, 500);
                break;
              default:
                setMessage('Some error occurred');
                setTimeout(() => {
                  setMessage('');
                }, 500);
                break;
            }
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                setMessage(`Upload file: ${name} completed successfully`);
                setTimeout(() => {
                  setMessage('');
                }, 500);
                // setAvatar(downloadURL);
                updatedUserData.avatar = downloadURL;
                return dataBase
                  .collection('users')
                  .doc(authUser.userID)
                  .update(updatedUserData);
              })
              .then(() => {
                setMessage('User profile updated successfully');
                setTimeout(() => {
                  setMessage('');
                }, 500);
                history.push(ROUTES.ADMIN_PROFILE);
              })
              .catch((error) => {
                setMessage(error.message);
              });
          }
        );
      }
    } else {
      if (isUpdateEmail) {
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );
        user
          ?.reauthenticateWithCredential(credential)
          .then((result) => {
            return result.user?.updateEmail(newEmail);
          })
          .then(() => {
            updatedUserData.email = newEmail;
            return dataBase
              .collection('users')
              .doc(authUser.userID)
              .update(updatedUserData);
          })
          .then(() => {
            setMessage('User profile and account updated successfully');
            setTimeout(() => {
              setMessage('');
              history.push(ROUTES.ADMIN_PROFILE);
            }, 500);
          })
          .catch((error) => {
            setMessage(error.message);
          });
      } else {
        dataBase
          .collection('users')
          .doc(authUser.userID)
          .update(updatedUserData)
          .then(() => {
            setMessage('User profile updated successfully');
            setTimeout(() => {
              setMessage('');
              history.push(ROUTES.ADMIN_PROFILE);
            }, 500);
          })
          .catch((error) => {
            setMessage(error.message);
          });
      }
    }
  };
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.AriaLabeledBy id='signOut'>
          Sign out
        </Navigation.AriaLabeledBy>
        <Navigation.SignoutButton
          aria-label='Sign out'
          aria-labelledby='signOut'
          type='button'
          onClick={() => {
            auth
              .signOut()
              .then(() => {
                localStorage.removeItem('authUser');
                setAuthUser(initialValue);
              })
              .catch((error) => {
                console.log('Sign out failed');
              });
          }}
        >
          sign out
        </Navigation.SignoutButton>
      </NavigationContainer>
      <SidebarContainer>
        {/** MENU CONTAINER */}
        <MenuContainer setSelectedPriceLists={setSelectedPriceLists} />
        {/** MENU CONTAINER */}
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <TitlePageContainer title='EDIT PROFILE' subTitle={authUser.nick} />
        {/** TITLE */}
        {/** FORM TO EDIT USER */}
        {message && <Form.Message>{message}</Form.Message>}
        <Form>
          <Form.Title>Edit your profile</Form.Title>
          <Form.AriaLabeledBy id='clearForm'>Clear form</Form.AriaLabeledBy>
          <Form.ClearButton
            aria-label='Clear form'
            aria-labelledby='clearForm'
            type='button'
            onClick={() => {
              setNick('');
              setCountry('');
              setCity('');
              setMobile('');
              setUploadedFile(null);
              if (isUpdateEmail) {
                setCurrentEmail('');
                setCurrentPassword('');
                setNewEmail('');
              }
            }}
          >
            CLEAR
          </Form.ClearButton>
          <Form.BaseForm onSubmit={(e) => handleUpdateProfileUser(e)}>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'nick'}>Nick:</Form.InputLabel>
              <Form.Input
                type='text'
                id='nick'
                name='nick'
                value={nick}
                placeholder='Your nick {4,8}'
                onChange={(e) => {
                  setNick(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setNick(e.currentTarget.value);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'country'}>Country:</Form.InputLabel>
              <Form.Input
                type='text'
                id='country'
                name='country'
                value={country}
                placeholder='Your country {4,20}'
                onChange={(e) => {
                  setCountry(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setCountry(e.currentTarget.value);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'city'}>City:</Form.InputLabel>
              <Form.Input
                type='text'
                id='city'
                name='city'
                value={city}
                placeholder='Your city {4,20}'
                onChange={(e) => {
                  setCity(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setCity(e.currentTarget.value);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'mobile'}>Mobile:</Form.InputLabel>
              <Form.Input
                type='text'
                id='mobile'
                name='mobile'
                value={mobile}
                placeholder='Your mobile: +48602191607'
                onChange={(e) => {
                  setMobile(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setMobile(e.currentTarget.value);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'avatar'}>Avatar:</Form.InputLabel>
              <Form.Input
                type='file'
                id='avatar'
                name='avatar'
                // value={avatar}
                placeholder='Your avatar'
                accept='.png, .jpg, .jpeg,.webP'
                onChange={(e) => {
                  setUploadedFile(e.currentTarget.files);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setUploadedFile(e.currentTarget.files);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            {/** CHECKBOX TO SET IF USER WANT TO UPDATE EMAIL ACCOUNT */}
            <Form.InputsGroup>
              <Form.CheckBoxInput
                type='checkbox'
                id='isUpdateEmail'
                name='isUpdateEmail'
                checked={isUpdateEmail}
                onChange={(e) => {
                  setIsUpdateEmail(!isUpdateEmail);
                  setMessage('');
                }}
              />
              <Form.InputLabel htmlFor={'isUpdateEmail'}>
                Change your email account too
              </Form.InputLabel>
            </Form.InputsGroup>
            {/** CHECKBOX TO SET IF USER WANT TO UPDATE EMAIL ACCOUNT */}
            {/** IF USER WANT TO CHANGE EMAIL ACCOUNT TOO */}
            {isUpdateEmail && (
              <React.Fragment>
                <Form.Break />
                <Form.InputsGroup>
                  <Form.InputLabel htmlFor={'currentEmail'}>
                    Current email:
                  </Form.InputLabel>
                  <Form.Input
                    type='text'
                    id='currentEmail'
                    name='currentEmail'
                    value={currentEmail}
                    placeholder='Current email - kryniu@gmail.com'
                    onChange={(e) => {
                      setCurrentEmail(e.currentTarget.value);
                      setMessage('');
                    }}
                    onKeyDown={(e) => {
                      setCurrentEmail(e.currentTarget.value);
                      setMessage('');
                    }}
                  ></Form.Input>
                </Form.InputsGroup>
                <Form.InputsGroup>
                  <Form.InputLabel htmlFor={'newEmail'}>
                    New email:
                  </Form.InputLabel>
                  <Form.Input
                    type='text'
                    id='newEmail'
                    name='newEmail'
                    value={newEmail}
                    placeholder='New email - kryniu@wp.pl'
                    onChange={(e) => {
                      setNewEmail(e.currentTarget.value);
                      setMessage('');
                    }}
                    onKeyDown={(e) => {
                      setNewEmail(e.currentTarget.value);
                      setMessage('');
                    }}
                  ></Form.Input>
                </Form.InputsGroup>
                <Form.InputsGroup>
                  <Form.InputLabel htmlFor={'currentPassword'}>
                    Current password:
                  </Form.InputLabel>
                  <Form.Input
                    type='text'
                    id='currentPassword'
                    name='currentPassword'
                    value={currentPassword}
                    placeholder='Current password -{6,10}'
                    onChange={(e) => {
                      setCurrentPassword(e.currentTarget.value);
                      setMessage('');
                    }}
                    onKeyDown={(e) => {
                      setCurrentPassword(e.currentTarget.value);
                      setMessage('');
                    }}
                  ></Form.Input>
                </Form.InputsGroup>
              </React.Fragment>
            )}
            {/** IF USER WANT TO CHANGE EMAIL ACCOUNT TOO */}
            <Form.Break />
            <Form.AriaLabeledBy id='editAdmin'>Edit admin</Form.AriaLabeledBy>
            <Form.SubmitButton
              aria-label='Edit admin'
              aria-labelledby='editAdmin'
              type='submit'
              disabled={!isValidForm}
            >
              Edit
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
        {/** FORM TO EDIT USER */}
      </MainContainer>
    </React.Fragment>
  );
};
