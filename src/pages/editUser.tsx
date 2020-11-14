import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth, dataBase, storage } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle, Form } from '../components';
import { useAuth } from '../hooks';
import * as ROUTES from '../constants/routes';
import { InputsGroup } from '../components/form/styles/form';

interface IUserPage {}
export const EditUserPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const history = useHistory();

  const [nick, setNick] = React.useState<string>(authUser.nick);
  const [country, setCountry] = React.useState<string>(authUser.country);
  const [city, setCity] = React.useState<string>(authUser.city);
  const [mobile, setMobile] = React.useState<string>(authUser.mobile);
  const [uploadedFile, setUploadedFile] = React.useState<FileList | null>(null);
  const [avatar, setAvatar] = React.useState<string>(authUser.avatar);
  const [message, setMessage] = React.useState<string>('');

  const handleUpdateProfileUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const updatedUserData = {
      nick,
      country,
      city,
      mobile,
      avatar,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    const file = uploadedFile && uploadedFile[0];

    if (!!file) {
      const storageRef = storage.ref(`assets/images/${file?.name}`);
      const name = storageRef.name;

      const uploadTask = storageRef.put(file);
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
              setAvatar(downloadURL);
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
              history.push(ROUTES.USER);
            })
            .catch((error) => {
              setMessage(error.message);
              setTimeout(() => {
                setMessage('');
              }, 500);
            });
        }
      );
    } else {
      dataBase
        .collection('users')
        .doc(authUser.userID)
        .update(updatedUserData)
        .then(() => {
          setMessage('User profile updated successfully');
          setTimeout(() => {
            setMessage('');
            history.push(ROUTES.USER);
          }, 500);
        })
        .catch((error) => {
          setMessage(error.message);
          setTimeout(() => {
            setMessage('');
          }, 500);
        });
    }
  };
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.SignoutButton
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
        {/** LINKS */}
        <ListItems>
          <ListItems.Title>LINKS</ListItems.Title>
          <ListItems.List>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.USER_EDIT}>
                Edit Profile
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.BROWSE}>
                Browse Price Lists
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
          </ListItems.List>
        </ListItems>
        {/** LINKS */}
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>EDIT PROFILE</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{authUser.nick}</ContentTitle.SubTitle>
        </ContentTitle>
        {/** TITLE */}
        {/** FORM TO EDIT USER */}
        {message && <Form.Message>{message}</Form.Message>}
        <Form>
          <Form.Title>Edit your profile</Form.Title>
          <Form.ClearButton
            type='button'
            onClick={() => {
              setNick('');
              setCountry('');
              setCity('');
              setMobile('');
              setUploadedFile(null);
            }}
          >
            CLEAR
          </Form.ClearButton>
          <Form.BaseForm onSubmit={(e) => handleUpdateProfileUser(e)}>
            <InputsGroup>
              <Form.InputLabel htmlFor={'nick'}>Nick:</Form.InputLabel>
              <Form.Input
                type='text'
                id='nick'
                name='nick'
                value={nick}
                placeholder='Your nick'
                onChange={(e) => setNick(e.currentTarget.value)}
                onKeyDown={(e) => setNick(e.currentTarget.value)}
              ></Form.Input>
            </InputsGroup>
            <InputsGroup>
              <Form.InputLabel htmlFor={'country'}>Country:</Form.InputLabel>
              <Form.Input
                type='text'
                id='country'
                name='country'
                value={country}
                placeholder='Your country'
                onChange={(e) => setCountry(e.currentTarget.value)}
                onKeyDown={(e) => setCountry(e.currentTarget.value)}
              ></Form.Input>
            </InputsGroup>
            <InputsGroup>
              <Form.InputLabel htmlFor={'city'}>City:</Form.InputLabel>
              <Form.Input
                type='text'
                id='city'
                name='city'
                value={city}
                placeholder='Your city'
                onChange={(e) => setCity(e.currentTarget.value)}
                onKeyDown={(e) => setCity(e.currentTarget.value)}
              ></Form.Input>
            </InputsGroup>
            <InputsGroup>
              <Form.InputLabel htmlFor={'mobile'}>Mobile:</Form.InputLabel>
              <Form.Input
                type='text'
                id='mobile'
                name='mobile'
                value={mobile}
                placeholder='Your mobile'
                onChange={(e) => setMobile(e.currentTarget.value)}
                onKeyDown={(e) => setMobile(e.currentTarget.value)}
              ></Form.Input>
            </InputsGroup>
            <InputsGroup>
              <Form.InputLabel htmlFor={'avatar'}>Avatar:</Form.InputLabel>
              <Form.Input
                type='file'
                id='avatar'
                name='avatar'
                // value={avatar}
                placeholder='Your avatar'
                accept='.png, .jpg, .jpeg,.webP'
                onChange={(e) => setUploadedFile(e.currentTarget.files)}
                onKeyDown={(e) => setUploadedFile(e.currentTarget.files)}
              ></Form.Input>
            </InputsGroup>
            <Form.Break />
            <Form.SubmitButton type='submit' disabled={false}>
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
