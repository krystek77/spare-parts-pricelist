import React from 'react';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';

interface IBrowsePage {
  role?: string;
}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  role = 'admin',
  ...restProps
}) => {
  // console.log('Browse Page - restProps: ', restProps);
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        {role === 'admin' && (
          <Navigation.ButtonLink to={ROUTES.ADMIN}>ADMIN</Navigation.ButtonLink>
        )}
        {role === 'user' && (
          <Navigation.ButtonLink to={ROUTES.USER}>USER</Navigation.ButtonLink>
        )}
        <Navigation.ButtonLink to={ROUTES.HOME}>sign out</Navigation.ButtonLink>
      </NavigationContainer>
      <SidebarContainer>BROWSE FOR ALL ...</SidebarContainer>
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
