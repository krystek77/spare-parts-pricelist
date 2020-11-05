import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Sidebar } from '../components';
import * as ROUTES from '../constants/routes';
import { useAuth, usePriceLists } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';

interface IAdminPage {}
export const AdminPage: React.FC<IAdminPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { priceLists } = usePriceLists(authUser.userID); //Maybe from localStorage
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  return (
    <React.Fragment>
      <NavigationContainer bgColor>
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
        SIDEBAR ADMIN ...
        <Sidebar.ButtonLink to={ROUTES.ADD_USER}>Add User</Sidebar.ButtonLink>
        <Sidebar.ButtonLink to={ROUTES.BROWSE}>
          Browse PriceLists
        </Sidebar.ButtonLink>
        {priceLists.length > 0 && (
          <ul>
            {priceLists.map((item) => {
              return (
                <li key={item.priceListID}>
                  <button
                    type='button'
                    onClick={() => setSelectedPriceLists(item.priceListID)}
                    onKeyDown={() => setSelectedPriceLists(item.priceListID)}
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
      <MainContainer>MAIN CONTAINER</MainContainer>
    </React.Fragment>
  );
};
