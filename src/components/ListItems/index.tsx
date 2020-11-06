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
} from './styles/listItems';

interface IListItemsComposition {
  List: React.FC;
  ListButtonGroup: React.FC;
  ListItem: React.FC;
  ListItemButtonLink: React.FC<{
    to: string;
    onClick?: () => void;
  }>;
  ListItemButton: React.FC<{
    type: 'button';
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
  Title: React.FC;
  ListItemIconButton: React.FC<{
    group?: boolean;
    type: 'button';
    onClick?: () => void;
    onKeyDown?: () => void;
  }>;
}
export const ListItems: React.FC & IListItemsComposition = ({ children }) => {
  return (
    <Container>
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
