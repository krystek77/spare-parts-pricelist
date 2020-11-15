import React from 'react';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  UserProfileContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
import { useAuth } from '../hooks';
import * as ROUTES from '../constants/routes';
import { useSelectedPriceListsContextValue } from '../context';

interface IAdminProfilePage {}
export const AdminProfilePage: React.FC<IAdminProfilePage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

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
              <ListItems.ListItemButtonLink to={ROUTES.ADMIN_PROFILE}>
                Profile
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_USER}>
                Add User
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.EDIT_ADMIN}>
                Edit Profile
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.BROWSE_USERS}>
                Browse Users
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
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>USER PROFILE</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{authUser.nick}</ContentTitle.SubTitle>
        </ContentTitle>
        {/** TITLE */}
        {/** USER PROFILE */}
        <UserProfileContainer authUser={authUser} />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};
