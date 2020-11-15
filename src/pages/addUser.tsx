import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Form, ListItems, ContentTitle } from '../components';
import * as ROUTES from '../constants/routes';
import { dataValidation, checkLength, ROLES } from '../helpers';
import { EditSparePartPage } from '.';
import { useSelectedPriceListsContextValue } from '../context';

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
  const { setAuthUser, initialValue } = useAuth();

  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  const validForm =
    dataValidation(email, password) &&
    password === confiremdPassword &&
    EditSparePartPage;
  checkLength(nick, 4, 8);
  const isError = Object.keys(errors).length > 0 ? true : false;

  const handleAddUser = (e: React.SyntheticEvent) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user) {
          const uid = authUser.user.uid;
          dataBase
            .collection('users')
            .doc(uid)
            .set({
              userID: uid,
              email: email,
              role: userRole,
              nick: nick,
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/spare-parts-pricelist.appspot.com/o/assets%2Fimages%2Fdefault_avatar.webP?alt=media&token=642bc9f6-6015-463e-b845-69013cd697da',
              added: new Date().toISOString().slice(0, 10),
            });
        }
      })
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => setErrors({ ...errors, server: error.message }));
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
                // history.push(ROUTES.HOME);
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
              <ListItems.ListItemButtonLink to={ROUTES.ADMIN_PROFILE}>
                Profile
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_USER}>
                Add User
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.EDIT_ADMIN}>
                Edit Profile
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.BROWSE_USERS}>
                Browse Users
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
                Add Spare Part
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink
                to={ROUTES.BROWSE}
                onClick={() => setSelectedPriceLists('')}
              >
                Browese PriceLists
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADMIN}>
                Admin
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
          </ListItems.List>
        </ListItems>
        {/** LINKS */}
      </SidebarContainer>
      <MainContainer>
        {/** PAGE TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>ADD USER</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>Another satisfied user</ContentTitle.SubTitle>
        </ContentTitle>
        {/** PAGE TITLE */}
        {isError && errors.server && (
          <Form.ErrorServer>{errors.server}</Form.ErrorServer>
        )}
        <Form size={'addUser'}>
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
            <Form.SubmitButton type='submit' disabled={!validForm}>
              Add User
            </Form.SubmitButton>
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
