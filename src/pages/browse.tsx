import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';
import { ROLES } from '../helpers';
import { useAuth } from '../hooks';

interface IBrowsePage {}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  ...restProps
}) => {
  const { authUser, setAuthUser, initialValue } = useAuth();

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        {authUser.role === ROLES.ADMIN && (
          <Navigation.ButtonLink to={ROUTES.ADMIN}>ADMIN</Navigation.ButtonLink>
        )}
        {authUser.role === ROLES.USER && (
          <Navigation.ButtonLink to={ROUTES.USER}>USER</Navigation.ButtonLink>
        )}
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
      <SidebarContainer>BROWSE FOR ALL...</SidebarContainer>
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
