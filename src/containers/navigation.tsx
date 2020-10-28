import React from 'react';
import * as ROUTES from '../constants/routes';
import { Navigation } from '../components';
import logo from '../logo.svg';
interface INavigationContainer {
  bgColor?: boolean;
}
export const NavigationContainer: React.FC<INavigationContainer> = ({
  bgColor = false,
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
          <Navigation.ButtonLink to={ROUTES.SIGNIN}>
            sign in
          </Navigation.ButtonLink>
        </Navigation.Panel>
      </Navigation>
    </Navigation.Container>
  );
};
