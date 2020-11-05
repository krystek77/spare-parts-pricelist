import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Sidebar, ListItems } from '../components';
import * as ROUTES from '../constants/routes';
import { useAuth, usePriceLists, useSpareParts } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';

interface IAdminPage {}
export const AdminPage: React.FC<IAdminPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { priceLists } = usePriceLists(authUser.userID); //Maybe from localStorage
  const {
    selectedPriceLists,
    setSelectedPriceLists,
  } = useSelectedPriceListsContextValue();
  const { spareParts } = useSpareParts(selectedPriceLists, authUser.userID);

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
        {/** PRICE LISTS */}
        <ListItems>
          <ListItems.Title>Price Lists</ListItems.Title>
          {priceLists.length > 0 && (
            <ListItems.List>
              {priceLists.map((item) => {
                return (
                  <ListItems.ListItem key={item.priceListID}>
                    <ListItems.ListItemButton
                      type='button'
                      onKeyDown={() => setSelectedPriceLists(item.priceListID)}
                      onClick={() => setSelectedPriceLists(item.priceListID)}
                    >
                      {item.name}
                    </ListItems.ListItemButton>
                  </ListItems.ListItem>
                );
              })}
            </ListItems.List>
          )}
          <ListItems.ListButtonGroup>
            <ListItems.ListItemIconButton
              group
              type='button'
              onClick={() => {
                setSelectedPriceLists('');
              }}
              onKeyDown={() => {
                setSelectedPriceLists('');
              }}
            >
              ALL
            </ListItems.ListItemIconButton>
          </ListItems.ListButtonGroup>
        </ListItems>
        {/** PRICE LISTS */}
      </SidebarContainer>
      <MainContainer>
        {spareParts.length > 0 && (
          <ul>
            {spareParts.map((item) => {
              return (
                <li key={item.sparePartId}>
                  <h2>{item.model}</h2>
                  <h3>
                    <div>
                      <span>Spare part name</span>
                    </div>
                    <div>
                      <span>From year</span>From year
                    </div>
                    <div>
                      <span>To year</span>
                    </div>
                    <div>
                      <span>Purchase price</span>
                      <span>{`[${item.currency}]`}</span>
                    </div>
                    <div>
                      <span>Is calculated</span>
                    </div>
                    <div>
                      <span>Selling price</span>
                      <span>[ZŁ]</span>
                    </div>
                  </h3>
                  <div>
                    <span>{item.name}</span>
                    <span>{item.from}</span>
                    <span>{item.to}</span>
                    <span>{item.purchasePrice}</span>
                    <span>{item.isCalculated ? 'YES' : 'NO'}</span>
                    <span>{item.sellingPrice}</span>
                  </div>
                  <p>{item.description}</p>
                  <p>{item.comments}</p>
                </li>
              );
            })}
          </ul>
        )}
      </MainContainer>
    </React.Fragment>
  );
};
