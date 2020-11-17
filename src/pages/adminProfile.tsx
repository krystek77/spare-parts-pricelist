import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  UserProfileContainer,
  TitlePageContainer,
  MenuContainer,
} from '../containers';
import { Navigation } from '../components';
import { useAuth } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';

interface IAdminProfilePage {}
export const AdminProfilePage: React.FC<IAdminProfilePage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.AriaLabeledBy id='signOut'>
          Sign out
        </Navigation.AriaLabeledBy>
        <Navigation.SignoutButton
          aria-label='Sign out'
          aria-labelledby='signOut'
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
