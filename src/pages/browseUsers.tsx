import React from 'react';
import { useAuth, useUsers } from '../hooks';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  MenuContainer,
  NavigationContainer,
  SidebarContainer,
  TitlePageContainer,
  UserProfileContainer,
} from '../containers';
import { Navigation } from '../components';
import { useSelectedPriceListsContextValue } from '../context';

export const BrowseUSersPage: React.FC = () => {
  const { setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();
  const { users } = useUsers();
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
                // history.push(ROUTES.HOME);
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
        {/** PAGE TITLE */}
        <TitlePageContainer title='USER LIST' subTitle='All users' />

        {/** PAGE TITLE */}
        {/** USER LIST */}
        {users &&
          users.length > 0 &&
          users.map((item) => (
            <UserProfileContainer
              key={item.userID}
              authUser={item}
              userList
              handleDelete={handleDeleteUser}
              message={message}
            />
          ))}
        {/** USER LIST */}
      </MainContainer>
    </React.Fragment>
  );
};
