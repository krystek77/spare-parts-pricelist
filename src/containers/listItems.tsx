import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ListItems } from '../components';
import { getAuthUser } from '../helpers';

interface IListItemsContainer {
  list?: any[];
  handler?: (item: string) => void;
  handleDeletePriceList?: (item: string) => void;
  activeValue?: string;
  browse?: boolean;
}

export const ListItemsContainer: React.FC<IListItemsContainer> = ({
  children,
  activeValue = null,
  ...restProps
}) => {
  const { list, handler, handleDeletePriceList, browse } = restProps;
  const [active, setActive] = React.useState<string | null>(activeValue);
  const authUser = getAuthUser();
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
                  active={active === item.priceListID}
                  onClick={() => {
                    handler && handler(item.priceListID);
                    setActive(item.priceListID);
                  }}
                >
                  {item.name}
                </ListItems.ListItemButton>
                {!browse && (
                  <ListItems.ListItemIconButton
                    type='button'
                    onClick={() =>
                      handleDeletePriceList &&
                      handleDeletePriceList(item.priceListID)
                    }
                    isOwner={authUser.userID === item.userID}
                    disabled={authUser.userID !== item.userID}
                  >
                    <FaTrashAlt />
                  </ListItems.ListItemIconButton>
                )}
                {children}
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
            setActive(null);
          }}
          onKeyDown={() => {
            handler && handler('');
            setActive(null);
          }}
        >
          ALL
        </ListItems.ListItemIconButton>
      </ListItems.ListButtonGroup>
    </ListItems>
  );
};
