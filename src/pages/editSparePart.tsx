import React from 'react';
import { auth } from '../lib/firebase';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  NavigationContainer,
  SidebarContainer,
  MainContainer,
  InfoContainer,
} from '../containers';
import { Navigation, ListItems, ContentTitle } from '../components';
import { useAuth } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
import * as ROUTES from '../constants/routes';
interface IRoutesProps {
  /**
   * routes props
   */
  sparePartID: string;
}
interface IEditSparePartPage extends RouteComponentProps<IRoutesProps> {
  /**
   * regular props
   */
}

interface ISparePart {
  sparePartID: string;
  comments: string;
  currency: string;
  description: string;
  from: string;
  model: string;
  name: string;
  priceListID: string;
  purchasePrice: number;
  sellingPrice: number;
  to: string;
  userID: string;
  slug: string;
}

const EditPage: React.FC<IEditSparePartPage> = (props) => {
  const { setAuthUser, initialValue } = useAuth();
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

  const { match } = props;
  console.log('sparePartID', match.params.sparePartID);

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
        <InfoContainer />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>EDIT SPARE PART</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>
            ...{match.params.sparePartID} ...
          </ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}
      </MainContainer>
    </React.Fragment>
  );
};

export const EditSparePartPage = withRouter(EditPage);
