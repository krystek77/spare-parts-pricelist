import React from 'react';
import { ListItems } from '../components';
import * as ROUTES from '../constants/routes';

interface IMenuContainer {
  setSelectedPriceLists: (item: string) => void;
}
export const MenuContainer: React.FC<IMenuContainer> = React.memo(
  ({ setSelectedPriceLists }) => {
    return (
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
            <ListItems.ListItemButtonLink to={ROUTES.RESET_PASSWORD}>
              Reset Password
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
    );
  }
);
export default MenuContainer;
