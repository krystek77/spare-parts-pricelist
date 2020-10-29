import React from 'react';
import * as ROUTES from '../constants/routes';
import { Navigation } from '../components';
import logo from '../logo.svg';
interface INavigationContainer {
  bgColor?: boolean;
  isAuthenticated?: boolean;
}
export const NavigationContainer: React.FC<INavigationContainer> = ({
  bgColor = false,
  isAuthenticated = false,
}) => {
  return (
    <Navigation.Container bgColor={bgColor}>
      <Navigation>
        <Navigation.Panel>
          <Navigation.Logo to={ROUTES.HOME}>
            <Navigation.LogoIcon src={logo} alt={'Application Logo'} />
            <Navigation.LogoText>Spare Parts</Navigation.LogoText>
          </Navigation.Logo>
        </Navigation.Panel>
        <Navigation.Panel>
          {!isAuthenticated && (
            <Navigation.ButtonLink to={ROUTES.SIGNIN}>
              sign in
            </Navigation.ButtonLink>
          )}
          {isAuthenticated && (
            <Navigation.ButtonLink to={ROUTES.HOME}>
              log out
            </Navigation.ButtonLink>
          )}
        </Navigation.Panel>
      </Navigation>
    </Navigation.Container>
  );
};
