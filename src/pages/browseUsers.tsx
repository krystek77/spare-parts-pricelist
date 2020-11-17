import React from 'react';
import { useAuth, useUsers } from '../hooks';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  TitlePageContainer,
  UserProfileContainer,
} from '../containers';
import { Navigation, ListItems } from '../components';
import * as ROUTES from '../constants/routes';

export const BrowseUSersPage: React.FC = () => {
  const { setAuthUser, initialValue } = useAuth();
  const { users } = useUsers();
  const [message, setMessage] = React.useState('');

  const handleDeleteUser = (userID: string) => {
    dataBase
      .collection('users')
      .doc(userID)
      .delete()
      .then(() => {
        setMessage('User deleted successfully');
        setTimeout(() => {
          setMessage('');
        }, 500);
      })
      .catch((error) => {
        setMessage(error.message);
        setTimeout(() => {
          setMessage('');
        }, 500);
      });
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
              <ListItems.ListItemButtonLink to={ROUTES.BROWSE}>
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
        <TitlePageContainer title='USER LIST' subTitle='All users' />

        {/** PAGE TITLE */}
        {/** USER LIST */}
        {users &&
          users.length > 0 &&
          users.map((item) => (
            <UserProfileContainer
              key={item.userID}
              authUser={item}
              userList
              handleDelete={handleDeleteUser}
              message={message}
            />
          ))}
        {/** USER LIST */}
      </MainContainer>
    </React.Fragment>
  );
};
