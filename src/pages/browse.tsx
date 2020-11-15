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
import { Navigation, ContentTitle, Form } from '../components';
import * as ROUTES from '../constants/routes';
import { ROLES } from '../helpers';
import { useAuth, usePriceLists, useSpareParts } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
interface ISparePart {
  sparePartID: string;
  comments: string;
  currency: string;
  description: string;
  from: string;
  model: string;
  name: string;
  priceListID: string;
  purchasePrice: number;
  sellingPrice: number;
  to: string;
  userID: string;
  slug: string;
  added: string;
  updated: string;
}
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

  const [filteredSpareParts, setFilteredSpareParts] = React.useState<
    ISparePart[]
  >([]);

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    const filtered = spareParts.filter((item) => {
      return item.name.match(search);
    });
    setFilteredSpareParts(filtered);
    return () => {};
  }, [search, spareParts]);

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
        <ListItemsContainer
          list={priceLists}
          handler={setSelectedPriceLists}
          browse
        />
        {/** PRICE LISTS */}
        {/** INFO */}
        <InfoContainer />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** SEARCH BY NAME */}
        <Form size='search'>
          <Form.Title>Search By Name</Form.Title>
          <Form.BaseForm>
            <Form.InputsGroup>
              <Form.Input
                type='text'
                name='search'
                id='search'
                value={search}
                placeholder='Enter search text'
                onChange={(e) => setSearch(e.currentTarget.value)}
                onKeyDown={(e) => setSearch(e.currentTarget.value)}
              />
            </Form.InputsGroup>
          </Form.BaseForm>
        </Form>
        {/** SEARCH BY NAME */}
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>PRICE LIST</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{namePriceList}</ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}

        {/** DATA OF SPARE PARTS */}
        <TableContainer
          list={filteredSpareParts}
          handleDelete={handleDeleteSparePart}
          message={message}
          isLoading={isLoading}
          role={authUser.role}
          browse
        />
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};
