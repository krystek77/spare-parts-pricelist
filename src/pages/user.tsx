import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation } from '../components';
import { useAuth } from '../hooks';

interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  const { setAuthUser, initialValue } = useAuth();

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
      <SidebarContainer>SIDEBAR USER ....</SidebarContainer>
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
