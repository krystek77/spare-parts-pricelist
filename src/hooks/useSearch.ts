import React from 'react';

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
  added: string;
  updated: string;
}
export const useSearch = (list: ISparePart[]) => {
  const [filteredSpareParts, setFilteredSpareParts] = React.useState<
    ISparePart[]
  >([]);

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    const filtered = list.filter((item: ISparePart) => {
      return item.name.match(search);
    });
    setFilteredSpareParts(filtered);
    return () => {};
  }, [search, list]);
  return { filteredSpareParts, search, setSearch };
};
