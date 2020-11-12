import React from 'react';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  ListItemsContainer,
  TableContainer,
  InfoContainer,
  AddPriceList,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
import * as ROUTES from '../constants/routes';
import { useAuth, usePriceLists, useSpareParts } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
import { ROLES } from '../helpers';

interface IAdminPage {}
export const AdminPage: React.FC<IAdminPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  /**
   * If I passed empty string, then I display all pricelists created by any admin
   * If I passed admin ID, then I displayed that pricelists for that admin
   * I think the price lists should not be assigned to specyfic admin
   */
  const { priceLists } = usePriceLists('');
  const {
    selectedPriceLists,
    setSelectedPriceLists,
  } = useSelectedPriceListsContextValue();
  const { spareParts, isLoading, setSpareParts } = useSpareParts(
    selectedPriceLists,
    authUser.userID
  );
  const [message, setMessage] = React.useState('');

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const namePriceList =
    selectedPriceList && !!selectedPriceList ? selectedPriceList.name : 'ALL';

  const handleDeletePriceList = (priceListID: string) => {
    console.log('DELETE PRICE LIST', priceListID);
    /**
     * A specific price list can only be deleted by the user who created it.
     * If other user added spare part to it than it was deleted.
     */
    const authUserID = authUser.userID;
    dataBase
      .collection('pricelists')
      .doc(priceListID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userID = doc.data()?.userID;
          if (userID === authUserID) {
            return (
              dataBase
                .collection('spare-parts')
                .where('priceListID', '==', priceListID)
                // .where('userID', '==', authUserID)
                .get()
            );
          } else {
            throw new Error(
              'You cannot delete this price list because you have not created it.'
            );
          }
        } else {
          throw new Error('Price list does not exist!');
        }
      })
      .then((result) => {
        const size = result?.size;

        if (size === 0) {
          console.log('All spare parts from this price list have been deleted');
          return;
        }
        const batch = dataBase.batch();
        result?.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => {
        console.log('Now I can delete pricelist');
        return dataBase.collection('pricelists').doc(priceListID).delete();
      })
      .then(() => console.log('PRICELIST DELETED'))
      .catch((error) => {
        console.log(error.message);
      });
  };

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
              <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
                Add Spare Part
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
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADMIN}>
                Admin
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
          </ListItems.List>
        </ListItems>
        {/** LINKS */}

        {/** PRICE LISTS */}
        <ListItemsContainer
          list={priceLists}
          handler={setSelectedPriceLists}
          handleDeletePriceList={handleDeletePriceList}
        />
        {/** PRICE LISTS */}
        {/** ADD PRICE LIST */}
        <AddPriceList />
        {/** ADD PRICE LIST */}
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
          isLoading={isLoading}
          handleDelete={handleDeleteSparePart}
          role={ROLES.ADMIN}
          message={message}
        />
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};
