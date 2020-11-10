import React from 'react';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
  TableContainer,
  InfoContainer,
} from '../containers';
import { Navigation, ContentTitle } from '../components';
import * as ROUTES from '../constants/routes';
import { ROLES } from '../helpers';
import { useAuth, usePriceLists, useSpareParts } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';

interface IBrowsePage {}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  ...restProps
}) => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const {
    selectedPriceLists,
    setSelectedPriceLists,
  } = useSelectedPriceListsContextValue();
  const { priceLists } = usePriceLists('');
  const { spareParts, setSpareParts, isLoading } = useSpareParts(
    selectedPriceLists,
    ''
  );
  const [message, setMessage] = React.useState('');

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const namePriceList =
    selectedPriceList && !!selectedPriceList ? selectedPriceList.name : 'ALL';

  const handleDeleteSparePart = (sparePartID: string) => {
    dataBase
      .collection('spare-parts')
      .doc(sparePartID)
      .delete()
      .then(() => {
        const newSpareParts = spareParts.filter(
          (item) => item.sparePartID !== sparePartID
        );
        setSpareParts(newSpareParts);
        setMessage('Spare part deleted successfully');
        setTimeout(() => {
          setMessage('');
        }, 1000);
      })
      .catch((error) => {
        setMessage(error.message);
        setTimeout(() => {
          setMessage('');
        }, 1000);
      });
  };
  // console.log(localStorage.getItem('authUser'));
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
        {/** PRICE LISTS */}
        <ListItemsContainer list={priceLists} handler={setSelectedPriceLists} />
        {/** PRICE LISTS */}
        {/** INFO */}
        <InfoContainer />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>PRICE LIST</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{namePriceList}</ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}
        {/** DATA OF SPARE PARTS */}
        <TableContainer
          list={spareParts}
          handleDelete={handleDeleteSparePart}
          message={message}
          isLoading={isLoading}
          role={authUser.role}
        />
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};
