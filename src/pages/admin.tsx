import React from 'react';
import { dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  InfoContainer,
  AddPriceList,
  SearchFormContainer,
  MenuContainer,
  SignOutContainer,
} from '../containers';
import { ListItems } from '../components';
import { useAuth, usePriceLists, useSearch, useSpareParts } from '../hooks';
import {
  useSelectedPriceListsContextValue,
  useExchangeRateContext,
} from '../context';
import { ROLES } from '../helpers';
const ResponsiveTableContainer = React.lazy(
  () => import('../containers/responsiveTable')
);
const TitlePageContainer = React.lazy(() => import('../containers/title'));
const ListItemsContainer = React.lazy(() => import('../containers/listItems'));

interface IAdminPage {}
export const AdminPage: React.FC<IAdminPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { course } = useExchangeRateContext();
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
  const [message, setMessage] = React.useState<string>('');
  const [messagePriceList, setMessagePriceList] = React.useState<string>('');

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const namePriceList =
    selectedPriceList && !!selectedPriceList ? selectedPriceList.name : 'ALL';

  const handleDeletePriceList = (priceListID: string) => {
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
          setMessagePriceList(
            'All spare parts from this price list have been deleted'
          );
          setTimeout(() => {
            setMessagePriceList('');
          }, 500);
          return;
        }
        const batch = dataBase.batch();
        result?.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => {
        return dataBase.collection('pricelists').doc(priceListID).delete();
      })
      .then(() => {
        setMessagePriceList('The price list deleted successfully');
        setTimeout(() => {
          setMessagePriceList('');
        }, 500);
        const restSpareParts = spareParts.filter(
          (item) => item.priceListID !== priceListID
        );
        setSpareParts(restSpareParts);
      })
      .catch((error) => {
        setMessagePriceList(error.message);
        setTimeout(() => {
          setMessagePriceList('');
        }, 500);
      });
  };

  const handleDeleteSparePart = (sparePartID: string) => {
    /**
     * Use transaction
     */
    const refToSparePart = dataBase.collection('spare-parts').doc(sparePartID);
    dataBase
      .runTransaction((transaction) => {
        return transaction.get(refToSparePart).then((doc) => {
          if (!doc.exists) {
            return new Error(
              'Spare parts, you want to delete, does not exists'
            );
          }
          transaction.delete(refToSparePart);
        });
      })
      .then(() => {
        console.log(
          'Transaction successfully commited. The spare part has been deleted'
        );
        setMessage(
          'Transaction successfully commited. The spare part has been deleted'
        );
        const newSpareParts = spareParts.filter(
          (item) => item.sparePartID !== sparePartID
        );
        setSpareParts(newSpareParts);
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

    // dataBase
    //   .collection('spare-parts')
    //   .doc(sparePartID)
    //   .delete()
    //   .then(() => {
    //     const newSpareParts = spareParts.filter(
    //       (item) => item.sparePartID !== sparePartID
    //     );
    //     setSpareParts(newSpareParts);
    //     setMessage('Spare part deleted successfully');
    //     setTimeout(() => {
    //       setMessage('');
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     setMessage(error.message);
    //     setTimeout(() => {
    //       setMessage('');
    //     }, 1000);
    //   });
  };

  const { filteredSpareParts, search, setSearch } = useSearch(spareParts);

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <SignOutContainer
          setAuthUser={setAuthUser}
          initialValue={initialValue}
        />
      </NavigationContainer>
      <SidebarContainer>
        {/** MENU CONTAINER */}
        <MenuContainer setSelectedPriceLists={setSelectedPriceLists} />
        {/** MENU CONTAINER */}
        {messagePriceList && (
          <ListItems.ListMessage>{messagePriceList}</ListItems.ListMessage>
        )}
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
        <InfoContainer course={course} />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** SEARCH BY NAME */}
        <SearchFormContainer search={search} setSearch={setSearch} />
        {/** SEARCH BY NAME */}
        {/** CONTENT TITLE */}
        <TitlePageContainer title='Admin' subTitle={namePriceList} />
        {/**  CONTENT TITLE */}
        {/** DATA OF SPARE PARTS */}
        <ResponsiveTableContainer
          list={filteredSpareParts}
          isLoading={isLoading}
          handleDelete={handleDeleteSparePart}
          role={ROLES.ADMIN}
          message={message}
          course={course}
        />
        {/* <TableContainer
          list={filteredSpareParts}
          isLoading={isLoading}
          handleDelete={handleDeleteSparePart}
          role={ROLES.ADMIN}
          message={message}
          course={course}
        /> */}
        {/** DATA OF SPARE PARTS */}
      </MainContainer>
    </React.Fragment>
  );
};

export default AdminPage;
