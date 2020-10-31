import React from 'react';
import { NavigationContainer } from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';
interface IBrowsePage {}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  ...restProps
}) => {
  // console.log('Browse Page - restProps: ', restProps);
  return (
    <NavigationContainer bgColor>
      <Navigation.ButtonLink to={ROUTES.HOME}>sign out</Navigation.ButtonLink>
    </NavigationContainer>
  );
};
