import React from 'react';
import { ListItems } from '../components';

interface IListItemsContainer {
  list?: any[];
  handler?: (item: string) => void;
}

export const ListItemsContainer: React.FC<IListItemsContainer> = ({
  children,
  ...restProps
}) => {
  const { list, handler } = restProps;

  return (
    <ListItems>
      <ListItems.Title>Price Lists</ListItems.Title>
      {list && list.length > 0 && (
        <ListItems.List>
          {list.map((item) => {
            return (
              <ListItems.ListItem key={item.priceListID}>
                <ListItems.ListItemButton
                  type='button'
                  onKeyDown={() => handler && handler(item.priceListID)}
                  onClick={() => handler && handler(item.priceListID)}
                >
                  {item.name}
                </ListItems.ListItemButton>
                {children}
                {/** for example icon button */}
              </ListItems.ListItem>
            );
          })}
        </ListItems.List>
      )}
      <ListItems.ListButtonGroup>
        <ListItems.ListItemIconButton
          group
          type='button'
          onClick={() => {
            handler && handler('');
          }}
          onKeyDown={() => {
            handler && handler('');
          }}
        >
          ALL
        </ListItems.ListItemIconButton>
      </ListItems.ListButtonGroup>
    </ListItems>
  );
};
