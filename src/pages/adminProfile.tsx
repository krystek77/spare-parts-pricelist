import React from 'react';
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
   * - delete all spare parts belong to current admin
   * - delete all pricelists belong to current admin
   * - delete admin details and than
   * - delete admin account
   */

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
        <UserProfileContainer authUser={authUser} />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};

export default AdminProfilePage;
