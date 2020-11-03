import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Sidebar, Form } from '../components';
import * as ROUTES from '../constants/routes';
import { dataValidation, checkLength, ROLES } from '../helpers';

interface IAddUser {}
interface IErrors {
  email?: string;
  password?: string;
  confirmedPassword?: string;
  server?: string;
}

export const AddUser: React.FC<IAddUser> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confiremdPassword, setConfiremdPassword] = React.useState<string>('');
  const [nick, setNick] = React.useState<string>('');
  const [errors, setErrors] = React.useState<IErrors>({});
  const [userRole, setUserRole] = React.useState<string>(ROLES.USER);
  const history = useHistory();

  const validForm =
    dataValidation(email, password) &&
    password === confiremdPassword &&
    checkLength(nick, 4, 8);
  const isError = Object.keys(errors).length > 0 ? true : false;

  const handleAddUser = (e: React.SyntheticEvent) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const { user } = data;
        if (user) {
          const newUser = {
            userID: user.uid,
            email: user.email,
            avatar: 'default_avatar',
            displayName: nick,
            role: userRole,
          };
          user.updateProfile({
            displayName: nick,
            photoURL: 'default_avatar',
          });
          return dataBase.collection('users').add(newUser);
        }
      })
      .then((user) => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => setErrors({ ...errors, server: error.message }));
  };

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.ButtonLink to={ROUTES.HOME}>sign out</Navigation.ButtonLink>
      </NavigationContainer>
      <SidebarContainer>
        SIDEBAR ADMIN ...
        <Sidebar.ButtonLink to={ROUTES.ADD_USER}>Add User</Sidebar.ButtonLink>
        <Sidebar.ButtonLink to={ROUTES.BROWSE}>
          Browse PriceLists
        </Sidebar.ButtonLink>
      </SidebarContainer>
      <MainContainer>
        {isError && errors.server && (
          <Form.ErrorServer>{errors.server}</Form.ErrorServer>
        )}
        <Form>
          <Form.Title>Add User</Form.Title>
          <Form.BaseForm onSubmit={handleAddUser}>
            <Form.Input
              type='text'
              name='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => {
                setErrors({});
                setEmail(e.currentTarget.value);
              }}
            />
            <Form.Input
              type='text'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setErrors({});
                setPassword(e.currentTarget.value);
              }}
            />
            <Form.Input
              type='text'
              name='confiremdPassword'
              value={confiremdPassword}
              placeholder='Confirm the password'
              onChange={(e) => {
                setErrors({});
                setConfiremdPassword(e.currentTarget.value);
              }}
            />
            <Form.Input
              type='text'
              name='name'
              placeholder='User nick'
              value={nick}
              onChange={(e) => {
                setErrors({});
                setNick(e.currentTarget.value);
              }}
            />
            <Form.Break />
            <Form.SubmitButton type='submit' disabled={!validForm}>
              Add User
            </Form.SubmitButton>
            <Form.Break />
            <Form.InputsGroup>
              <Form.RadioInput
                type='radio'
                id={ROLES.ADMIN}
                value={ROLES.ADMIN}
                name={ROLES.ADMIN}
                checked={userRole === ROLES.ADMIN}
                onChange={(e) => setUserRole(e.currentTarget.value)}
              />
              <Form.InputLabel htmlFor={ROLES.ADMIN}>
                {ROLES.ADMIN}
              </Form.InputLabel>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.RadioInput
                type='radio'
                id={ROLES.USER}
                value={ROLES.USER}
                name={ROLES.USER}
                checked={userRole === ROLES.USER}
                onChange={(e) => setUserRole(e.currentTarget.value)}
              />
              <Form.InputLabel htmlFor={ROLES.USER}>
                {ROLES.USER}
              </Form.InputLabel>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.RadioInput
                type='radio'
                id={ROLES.TESTER}
                value={ROLES.TESTER}
                name={ROLES.TESTER}
                checked={userRole === ROLES.TESTER}
                onChange={(e) => setUserRole(e.currentTarget.value)}
              />
              <Form.InputLabel htmlFor={ROLES.TESTER}>
                {ROLES.TESTER}
              </Form.InputLabel>
            </Form.InputsGroup>
            <Form.Break />
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </Form.TextSmall>
          </Form.BaseForm>
        </Form>
      </MainContainer>
    </React.Fragment>
  );
};
