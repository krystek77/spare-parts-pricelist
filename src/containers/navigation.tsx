import React from 'react';
import * as ROUTES from '../constants/routes';
import { Navigation } from '../components';
import logo from '../logo.svg';
import { getAuthUser } from '../helpers';
interface INavigationContainer {
  bgColor?: boolean;
}

export const NavigationContainer: React.FC<INavigationContainer> = ({
  children,
  bgColor = false,
  ...restProps
}) => {
  const authUser = getAuthUser();
  return (
    <>
      <Navigation.Container bgColor={bgColor}>
        <Navigation>
          <Navigation.Panel>
            <Navigation.Logo to={ROUTES.HOME}>
              <Navigation.LogoIcon src={logo} alt={'Application Logo'} />
              <Navigation.LogoText>Spare Parts</Navigation.LogoText>
            </Navigation.Logo>
          </Navigation.Panel>
          {authUser && authUser.role && (
            <Navigation.Panel>
              {`Hi, ${authUser.nick}`}
              <Navigation.Avatar
                src={`../assets/images/${authUser.avatar}.webP`}
                alt={`User avatar`}
              />
            </Navigation.Panel>
          )}
          <Navigation.Panel>{children}</Navigation.Panel>
        </Navigation>
      </Navigation.Container>
    </>
  );
};
