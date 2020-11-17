import React from 'react';
import { dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
  TableContainer,
  InfoContainer,
  SearchFormContainer,
  TitlePageContainer,
  SignOutContainer,
} from '../containers';
import { Navigation } from '../components';
import * as ROUTES from '../constants/routes';
import { ROLES } from '../helpers';
import { useAuth, usePriceLists, useSpareParts, useSearch } from '../hooks';
import {
  useSelectedPriceListsContextValue,
  useExchangeRateContext,
} from '../context';

interface IBrowsePage {}
export const BrowsePage: React.FC<IBrowsePage> = ({
  children,
  ...restProps
}) => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { course } = useExchangeRateContext();
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
  const { filteredSpareParts, search, setSearch } = useSearch(spareParts);

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        {authUser.role === ROLES.ADMIN && (
          <Navigation.ButtonLink to={ROUTES.ADMIN}>ADMIN</Navigation.ButtonLink>
        )}
        {authUser.role === ROLES.USER && (
          <Navigation.ButtonLink to={ROUTES.USER}>USER</Navigation.ButtonLink>
        )}
        <SignOutContainer
          setAuthUser={setAuthUser}
          initialValue={initialValue}
        />
      </NavigationContainer>
      <SidebarContainer>
        {/** PRICE LISTS */}
        <ListItemsContainer
          list={priceLists}
          handler={setSelectedPriceLists}
          browse
        />
        {/** PRICE LISTS */}
        {/** INFO */}
        <InfoContainer course={course} />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** SEARCH BY NAME */}
        <SearchFormContainer search={search} setSearch={setSearch} />
        {/** SEARCH BY NAME */}
        {/** CONTENT TITLE */}
        <TitlePageContainer title='PRICE LIST' subTitle={namePriceList} />
        {/**  CONTENT TITLE */}

        {/** DATA OF SPARE PARTS */}
        <TableContainer
          list={filteredSpareParts}
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
