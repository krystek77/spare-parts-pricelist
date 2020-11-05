import React from 'react';
import { dataBase } from '../lib/firebase';
//selected: '' than all priceLists, userID then for only given user
interface IPriceLists {
  priceListID: string;
  name: string;
  userID: string;
}
export const usePriceLists = (selected: string) => {
  const [priceLists, setPriceLists] = React.useState<IPriceLists[]>([]);

  React.useEffect(() => {
    let query = dataBase.collection('pricelists').get();
    query =
      selected !== ''
        ? dataBase
            .collection('pricelists')
            .where('userID', '==', selected)
            .get()
        : query;
    query
      .then((snapshot) => {
        const priceLists: IPriceLists[] = [];
        snapshot.forEach((doc) => {
          const priceList: IPriceLists = {
            priceListID: doc.id,
            name: doc.data().name,
            userID: doc.data().userID,
          };
          priceLists.push(priceList);
        });
        setPriceLists(priceLists);
      })
      .catch(() => console.log('CAN NOT GET PRICELISTS CATEGORIES'));
    return () => {};
  }, [selected]);
  return { priceLists, setPriceLists };
};
