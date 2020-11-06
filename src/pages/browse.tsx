import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
} from '../containers';
import { Navigation, Table, ContentTitle } from '../components';
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
  const { spareParts } = useSpareParts(selectedPriceLists, '');

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const namePriceList =
    selectedPriceList && !!selectedPriceList ? selectedPriceList.name : 'ALL';

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
      </SidebarContainer>
      <MainContainer>
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>PRICE LIST</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{namePriceList}</ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}
        {/** DATA OF SPARE PARTS */}
        <Table>
          <Table.BaseTable>
            {spareParts.length > 0 && (
              <>
                <Table.HeaderRowTable>
                  <Table.OrdinaryNumberColTable>
                    Lp.
                  </Table.OrdinaryNumberColTable>
                  <Table.HeaderContentRowTable>
                    <Table.HeaderColTable>Name</Table.HeaderColTable>
                    <Table.HeaderColTable>Model</Table.HeaderColTable>
                    <Table.HeaderColTable>From</Table.HeaderColTable>
                    <Table.HeaderColTable>To</Table.HeaderColTable>
                    <Table.HeaderColTable>Purchase</Table.HeaderColTable>
                    <Table.HeaderColTable>Calc.</Table.HeaderColTable>
                    <Table.HeaderColTable>Selling</Table.HeaderColTable>
                  </Table.HeaderContentRowTable>
                </Table.HeaderRowTable>
                {spareParts.map((item, index) => {
                  return (
                    <Table.RowTable key={item.sparePartID}>
                      <Table.OrdinaryNumberColTable>
                        {index + 1}
                      </Table.OrdinaryNumberColTable>
                      <Table.ContentColTable>
                        <Table.HeaderContentColTable>
                          <Table.HeaderContentFieldColTable>
                            {item.name}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {item.model}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {item.from}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {item.to}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {parseFloat(item.purchasePrice).toFixed(2) +
                              ` ${item.currency}`}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {item.isCalculated ? 'YES' : 'NO'}
                          </Table.HeaderContentFieldColTable>
                          <Table.HeaderContentFieldColTable>
                            {parseFloat(item.sellingPrice).toFixed(2) + ' ZŁ'}
                          </Table.HeaderContentFieldColTable>
                        </Table.HeaderContentColTable>
                        <Table.DescriptionContentColTable>
                          {item.description}
                        </Table.DescriptionContentColTable>
                        <Table.CommentsContentsColTable>
                          {item.comments}
                        </Table.CommentsContentsColTable>
                      </Table.ContentColTable>
                    </Table.RowTable>
                  );
                })}
              </>
            )}
          </Table.BaseTable>
        </Table>
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};
