import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
  TableContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
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

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const namePriceList =
    selectedPriceList && !!selectedPriceList ? selectedPriceList.name : 'ALL';

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
        {/** LINKS */}
        <ListItems>
          <ListItems.Title>LINKS</ListItems.Title>
          <ListItems.List>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_USER}>
                Add User
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink
                to={ROUTES.BROWSE}
                onClick={() => setSelectedPriceLists('')}
              >
                Browese PriceLists
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
          </ListItems.List>
        </ListItems>
        {/** LINKS */}

        {/** PRICE LISTS */}
        <ListItemsContainer list={priceLists} handler={setSelectedPriceLists}>
          <ListItems.ListItemIconButton type='button'>
            <FaTrashAlt />
          </ListItems.ListItemIconButton>
        </ListItemsContainer>
        {/** PRICE LISTS */}
      </SidebarContainer>
      <MainContainer>
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>PRICE LIST</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{namePriceList}</ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}
        {/** DATA OF SPARE PARTS */}
        <TableContainer list={spareParts} />
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};
