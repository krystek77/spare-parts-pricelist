import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  UserProfileContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
import { useAuth } from '../hooks';
import * as ROUTES from '../constants/routes';

interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();

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
          <ContentTitle.BaseTitle>USER PROFILE</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{authUser.nick}</ContentTitle.SubTitle>
        </ContentTitle>
        {/** TITLE */}
        {/** USER PROFILE */}
        <UserProfileContainer authUser={authUser} />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};
