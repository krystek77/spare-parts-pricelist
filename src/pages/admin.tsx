import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
} from '../containers';
import { Navigation, Sidebar, ListItems, Table } from '../components';
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
        <ListItemsContainer list={priceLists} handler={setSelectedPriceLists}>
          <ListItems.ListItemIconButton type='button'>
            <FaTrashAlt />
          </ListItems.ListItemIconButton>
        </ListItemsContainer>
        {/** PRICE LISTS */}
      </SidebarContainer>
      <MainContainer>
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
                    <Table.RowTable key={item.sparePartId}>
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
