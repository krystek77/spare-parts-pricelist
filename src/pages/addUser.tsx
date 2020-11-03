import React from 'react';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Sidebar } from '../components';
import * as ROUTES from '../constants/routes';

interface IAddUser {}
export const AddUser: React.FC<IAddUser> = () => {
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
      <MainContainer>MAIN CONTAINER - ADD USER</MainContainer>
    </React.Fragment>
  );
};
