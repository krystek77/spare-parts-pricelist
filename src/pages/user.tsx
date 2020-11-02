import React from 'react';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';

interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.ButtonLink to={ROUTES.HOME}>sign out</Navigation.ButtonLink>
      </NavigationContainer>
      <SidebarContainer>SIDEBAR USER ....</SidebarContainer>
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
