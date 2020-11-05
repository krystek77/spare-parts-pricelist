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
import { useAuth, usePriceLists } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';

interface IBrowsePage {}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  ...restProps
}) => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { priceLists } = usePriceLists('');
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  console.log(priceLists);
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
      <SidebarContainer>
        {priceLists.length > 0 && (
          <ul>
            {priceLists.map((item) => {
              return (
                <li key={item.priceListID}>
                  <button
                    type='button'
                    onKeyDown={() => setSelectedPriceLists(item.priceListID)}
                    onClick={() => setSelectedPriceLists(item.priceListID)}
                  >
                    {item.name}
                    {/** Individual priceList */}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </SidebarContainer>
      <MainContainer>MAIN CONTENT - SPARE PARTS</MainContainer>
    </React.Fragment>
  );
};
