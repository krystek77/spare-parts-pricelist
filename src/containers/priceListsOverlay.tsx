import React from 'react';
import { ListItems } from '../components';

interface IPriceListsOverlay {
  list: any[];
  setSelectedPriceLists: (item: string) => void;
  showPriceListsOverlay: boolean;
  setShowPriceListsOverlay: (item: boolean) => void;
}

export const PriceListsOverlay: React.FC<IPriceListsOverlay> = ({
  list,
  setSelectedPriceLists,
  showPriceListsOverlay = false,
  setShowPriceListsOverlay,
}) => {
  return list && list.length > 0 && showPriceListsOverlay ? (
    <ListItems dropDown>
      <ListItems.List>
        {list.map((item) => {
          return (
            <ListItems.ListItem key={item.priceListID}>
              <ListItems.ListItemButton
                type='button'
                onClick={() => {
                  setSelectedPriceLists(item.priceListID);
                  setShowPriceListsOverlay(false);
                }}
                onKeyDown={() => {
                  setSelectedPriceLists(item.priceListID);
                  setShowPriceListsOverlay(false);
                }}
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
