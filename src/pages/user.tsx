import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import {
  Navigation,
  ListItems,
  UserProfile,
  ContentTitle,
} from '../components';
import { useAuth } from '../hooks';
import * as ROUTES from '../constants/routes';

interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  console.log(authUser);
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
          <ContentTitle.BaseTitle>USER PROFILE</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{authUser.nick}</ContentTitle.SubTitle>
        </ContentTitle>
        {/** TITLE */}
        {/** USER PROFILE */}
        <UserProfile>
          <UserProfile.ImageWrapper>
            <UserProfile.Image
              src={`../assets/images/${authUser.avatar}.webP`}
              alt='User avatar'
            />
          </UserProfile.ImageWrapper>
          <UserProfile.DataWrapper>
            <UserProfile.Data>
              <UserProfile.DataLabel>Added:</UserProfile.DataLabel>
              <UserProfile.DataValue>2020-11-13</UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>Email:</UserProfile.DataLabel>
              <UserProfile.DataValue>{authUser.email}</UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>Name:</UserProfile.DataLabel>
              <UserProfile.DataValue>
                {`${authUser.nick}`.toUpperCase()}
              </UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>Role:</UserProfile.DataLabel>
              <UserProfile.DataValue>{authUser.role}</UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>Country:</UserProfile.DataLabel>
              <UserProfile.DataValue>Poland</UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>City:</UserProfile.DataLabel>
              <UserProfile.DataValue>Kielce</UserProfile.DataValue>
            </UserProfile.Data>
            <UserProfile.Data>
              <UserProfile.DataLabel>Mobile phone:</UserProfile.DataLabel>
              <UserProfile.DataValue>602 191 607</UserProfile.DataValue>
            </UserProfile.Data>
          </UserProfile.DataWrapper>
        </UserProfile>
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};
