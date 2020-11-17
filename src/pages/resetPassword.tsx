import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  MenuContainer,
  NavigationContainer,
  SidebarContainer,
  SignOutContainer,
  TitlePageContainer,
} from '../containers';
import { Form } from '../components';
import { useAuth } from '../hooks';
// import * as ROUTES from '../constants/routes';
import {
  // checkLength,
  emailValidation,
  passwordValidation,
} from '../helpers';
import { useSelectedPriceListsContextValue } from '../context';

interface IResetPassword {}
export const ResetPasswordPage: React.FC<IResetPassword> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  // const history = useHistory();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  const [message, setMessage] = React.useState<string>('');
  const [currentEmail, setCurrentEmail] = React.useState<string>(
    authUser.email
  );
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');

  //TODO: validation data

  const isValidForm =
    emailValidation(currentEmail) &&
    passwordValidation(currentPassword) &&
    passwordValidation(newPassword);

  const handleResetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <SignOutContainer
          setAuthUser={setAuthUser}
          initialValue={initialValue}
        />
      </NavigationContainer>
      <SidebarContainer>
        {/** MENU CONTAINER */}
        <MenuContainer setSelectedPriceLists={setSelectedPriceLists} />
        {/** MENU CONTAINER */}
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <TitlePageContainer title='RESET PASSWORD' subTitle={authUser.nick} />
        {/** TITLE */}
        {/** FORM TO RESET PASSWORD */}
        {message && <Form.Message>{message}</Form.Message>}
        <Form>
          <Form.Title>RESET YOUR PASSWORD</Form.Title>
          <Form.AriaLabeledBy id='clearForm'>Clear form</Form.AriaLabeledBy>
          <Form.ClearButton
            aria-label='Clear form'
            aria-labelledby='clearForm'
            type='button'
            onClick={() => {
              setCurrentEmail('');
              setCurrentPassword('');
              setNewPassword('');
              setMessage('');
            }}
          >
            CLEAR
          </Form.ClearButton>
          <Form.BaseForm onSubmit={(e) => handleResetPassword(e)}>
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
            <Form.InputsGroup>
              <Form.InputLabel htmlFor={'newPassword'}>
                New password:
              </Form.InputLabel>
              <Form.Input
                type='text'
                id='newPassword'
                name='newPassword'
                value={newPassword}
                placeholder='New password -{6,10}'
                onChange={(e) => {
                  setNewPassword(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setNewPassword(e.currentTarget.value);
                  setMessage('');
                }}
              ></Form.Input>
            </Form.InputsGroup>
            <Form.Break />
            <Form.AriaLabeledBy id='resetPassword'>
              RESET PASSWORD
            </Form.AriaLabeledBy>
            <Form.SubmitButton
              aria-label='Reset password'
              aria-labelledby='resetPassword'
              type='submit'
              disabled={!isValidForm}
            >
              RESET PASSWORD
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
        {/** FORM TO RESET PASSWORD */}
      </MainContainer>
    </React.Fragment>
  );
};
