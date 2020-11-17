import React from 'react';
import { ListItems } from '../components';
import * as ROUTES from '../constants/routes';

export const MenuUserContainer = () => {
  return (
    <ListItems>
      <ListItems.Title>LINKS</ListItems.Title>
      <ListItems.List>
        <ListItems.ListItem>
          <ListItems.ListItemButtonLink to={ROUTES.USER_EDIT}>
            Edit Profile
          </ListItems.ListItemButtonLink>
        </ListItems.ListItem>
        <ListItems.ListItem>
          <ListItems.ListItemButtonLink to={ROUTES.RESET_PASSWORD}>
            Reset Password
          </ListItems.ListItemButtonLink>
        </ListItems.ListItem>
        <ListItems.ListItem>
          <ListItems.ListItemButtonLink to={ROUTES.BROWSE}>
            Browse Price Lists
          </ListItems.ListItemButtonLink>
        </ListItems.ListItem>
      </ListItems.List>
    </ListItems>
  );
};
