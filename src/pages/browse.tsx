import React from 'react';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';
import { ROLES } from '../helpers';

interface IBrowsePage {
  role?: string;
}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  role = 'user',
  ...restProps
}) => {
  // console.log('Browse Page - restProps: ', restProps);
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        {role === ROLES.ADMIN && (
          <Navigation.ButtonLink to={ROUTES.ADMIN}>ADMIN</Navigation.ButtonLink>
        )}
        {role === ROLES.USER && (
          <Navigation.ButtonLink to={ROUTES.USER}>USER</Navigation.ButtonLink>
        )}
        <Navigation.ButtonLink to={ROUTES.HOME}>sign out</Navigation.ButtonLink>
      </NavigationContainer>
      <SidebarContainer>BROWSE FOR ALL ...</SidebarContainer>
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
