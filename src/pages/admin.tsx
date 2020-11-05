import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
} from '../containers';
import { Navigation, Sidebar } from '../components';
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
        <button
          type='button'
          onClick={() => {
            setSelectedPriceLists('');
          }}
          onKeyDown={() => {
            setSelectedPriceLists('');
          }}
        >
          ALL SPARE PARTS
        </button>
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
