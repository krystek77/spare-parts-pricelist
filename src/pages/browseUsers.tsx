import React from 'react';
import { useAuth, useUsers } from '../hooks';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  UserProfileContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
import * as ROUTES from '../constants/routes';

export const BrowseUSersPage: React.FC = () => {
  const { setAuthUser, initialValue } = useAuth();
  const { users } = useUsers();

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
              <ListItems.ListItemButtonLink to={ROUTES.ADD_USER}>
                Add User
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
        <ContentTitle>
          <ContentTitle.BaseTitle>USER LIST</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>All users</ContentTitle.SubTitle>
        </ContentTitle>
        {/** PAGE TITLE */}
        {/** USER LIST */}
        {users &&
          users.length > 0 &&
          users.map((item) => (
            <UserProfileContainer key={item.userID} authUser={item} userList />
          ))}
        {/** USER LIST */}
      </MainContainer>
    </React.Fragment>
  );
};
