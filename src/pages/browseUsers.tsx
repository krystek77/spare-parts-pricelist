import React from 'react';
import { useAuth, useUsers } from '../hooks';
import { dataBase } from '../lib/firebase';
import {
  MainContainer,
  MenuContainer,
  NavigationContainer,
  SidebarContainer,
  SignOutContainer,
  TitlePageContainer,
  UsersListContainer,
} from '../containers';
import { useSelectedPriceListsContextValue } from '../context';

export const BrowseUSersPage: React.FC = () => {
  const { setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  const { users, isLoading } = useUsers();
  const [message, setMessage] = React.useState('');

  const handleDeleteUser = (userID: string) => {
    dataBase
      .collection('users')
      .doc(userID)
      .delete()
      .then(() => {
        setMessage('User deleted successfully');
        setTimeout(() => {
          setMessage('');
        }, 500);
      })
      .catch((error) => {
        setMessage(error.message);
        setTimeout(() => {
          setMessage('');
        }, 500);
      });
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
        {/** PAGE TITLE */}
        <TitlePageContainer title='USER LIST' subTitle='All users' />
        {/** PAGE TITLE */}
        {/** USERS LIST */}
        <UsersListContainer
          users={users}
          isLoading={isLoading}
          handleDeleteUser={handleDeleteUser}
          message={message}
        />
        {/** USERS LIST */}
      </MainContainer>
    </React.Fragment>
  );
};

export default BrowseUSersPage;
