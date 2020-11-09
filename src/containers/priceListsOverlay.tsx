import React from 'react';
import { ListItems } from '../components';

interface IPriceListsOverlay {
  list: any[];
  setSelectedPriceLists: (item: string) => void;
  showPriceListsOverlay: boolean;
}

export const PriceListsOverlay: React.FC<IPriceListsOverlay> = ({
  list,
  setSelectedPriceLists,
  showPriceListsOverlay = false,
}) => {
  return list && list.length > 0 && showPriceListsOverlay ? (
    <ListItems dropDown>
      <ListItems.List>
        {list.map((item) => {
          return (
            <ListItems.ListItem key={item.priceListID}>
              <ListItems.ListItemButton
                type='button'
                onClick={() => setSelectedPriceLists(item.priceListID)}
                onKeyDown={() => setSelectedPriceLists(item.priceListID)}
              >
                {item.name}
              </ListItems.ListItemButton>
            </ListItems.ListItem>
          );
        })}
      </ListItems.List>
    </ListItems>
  ) : null;
};
