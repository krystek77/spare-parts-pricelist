import React from 'react';
import {
  Container,
  Inner,
  List,
  ListButtonGroup,
  ListItem,
  ListItemButton,
  ListItemIconButton,
  Title,
  ListItemButtonLink,
  ListMessage,
} from './styles/listItems';

interface IListItemsComposition {
  List: React.FC;
  ListButtonGroup: React.FC;
  ListItem: React.FC<{
    active?: boolean;
  }>;
  ListItemButtonLink: React.FC<{
    to: string;
    onClick?: () => void;
  }>;
  ListItemButton: React.FC<{
    type: 'button';
    active?: boolean;
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
  Title: React.FC;
  ListItemIconButton: React.FC<{
    isOwner?: boolean;
    disabled?: boolean;
    group?: boolean;
    type: 'button';
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
  ListMessage: React.FC;
}
export const ListItems: React.FC<{ dropDown?: boolean }> &
  IListItemsComposition = ({ dropDown, children }) => {
  return (
    <Container dropDown={dropDown}>
      <Inner>{children}</Inner>
    </Container>
  );
};

ListItems.Title = function ListItemsTitle({ children }) {
  return <Title>{children}</Title>;
};
ListItems.List = function ListItemsList({ children }) {
  return <List>{children}</List>;
};
ListItems.ListItem = function ListItemsListItem({ children }) {
  return <ListItem>{children}</ListItem>;
};
ListItems.ListButtonGroup = function ListItemsListButtonGroup({ children }) {
  return <ListButtonGroup>{children}</ListButtonGroup>;
};
ListItems.ListItemButton = function ListItemsListItemButton({
  children,
  ...restProps
}) {
  return <ListItemButton {...restProps}>{children}</ListItemButton>;
};

ListItems.ListItemButtonLink = function ListItemsListItemButtonLink({
  children,
  ...restProps
}) {
  return <ListItemButtonLink {...restProps}>{children}</ListItemButtonLink>;
};

ListItems.ListItemIconButton = function ListItemsListItemIconButton({
  children,
  ...restProps
}) {
  return <ListItemIconButton {...restProps}>{children}</ListItemIconButton>;
};

ListItems.ListMessage = function ListItemsListMessage({
  children,
  ...restProps
}) {
  return <ListMessage {...restProps}>{children}</ListMessage>;
};
