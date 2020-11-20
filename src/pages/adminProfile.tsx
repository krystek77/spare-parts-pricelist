import React from 'react';
import { dataBase, auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  UserProfileContainer,
  TitlePageContainer,
  MenuContainer,
  SignOutContainer,
} from '../containers';
import { useAuth } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
interface IAdminProfilePage {}
export const AdminProfilePage: React.FC<IAdminProfilePage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

  /**
   * TODO:
   * 1. Delete admin
   * - delete all spareparts  belong to current admin
   * - delete all pricelists belong to current admin
   * - delete admin details and than
   * - delete admin account
   */

  const handleDeleteAdmin = () => {
    // console.log('DELETE ADMIN');
    const currentAdminID = authUser.userID;
    dataBase
      .collection('spare-parts')
      .where('userID', '==', currentAdminID)
      .get()
      .then((collectionSpareParts) => {
        // console.log(collectionSpareParts.docs);
        if (collectionSpareParts.size === 0) {
          // console.log(`${authUser.nick} have not got any spareparts`);
          return;
        } else {
          const batch = dataBase.batch();
          collectionSpareParts.docs.forEach((sparepart) => {
            batch.delete(sparepart.ref);
          });
          // console.log(
          //   `${authUser.nick} have got spareparts, and they have been deleted`
          // );
          return batch.commit();
        }
      })
      .then(() => {
        // console.log('Now I can delete pricelist');
        return dataBase
          .collection('pricelists')
          .where('userID', '==', currentAdminID)
          .get();
      })
      .then((collectionPricelists) => {
        // console.log(collectionPricelists.docs);
        if (collectionPricelists.size === 0) {
          // console.log(`${authUser.nick} have not got any pricelists`);
          return;
        } else {
          const batch = dataBase.batch();
          collectionPricelists.docs.forEach((pricelist) => {
            batch.delete(pricelist.ref);
          });
          // console.log(
          //   `${authUser.nick} have got pricelists, and they have been deleted`
          // );
          return batch.commit();
        }
      })
      .then(() => {
        // console.log('Now I can delete user details');
        return dataBase.collection('users').doc(currentAdminID).delete();
      })
      .then(() => {
        // console.log('Now I can delete user account');
        const user = auth.currentUser;
        if (user) {
          return user.delete();
        }
      })
      .then(() => {
        // console.log(
        //   'User account and all data belong to him and created by him have been deleted successfully'
        // );
      })
      .catch((error) => console.log(error.message));
  };
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
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <TitlePageContainer title='USER PROFILE' subTitle={authUser.nick} />
        {/** TITLE */}
        {/** USER PROFILE */}
        <UserProfileContainer
          authUser={authUser}
          handleDeleteAdmin={handleDeleteAdmin}
        />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};

export default AdminProfilePage;
