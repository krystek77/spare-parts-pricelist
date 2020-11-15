import React from 'react';
import { dataBase } from '../lib/firebase';
//selected: '' than all priceLists, userID then for only given user
interface IPriceList {
  priceListID: string;
  name: string;
  userID: string;
  added: string | undefined;
}
export const usePriceLists = (selected: string) => {
  const [priceLists, setPriceLists] = React.useState<IPriceList[]>([]);

  React.useEffect(() => {
    let unsubscribe =
      selected !== ''
        ? dataBase
            .collection('pricelists')
            .where('userID', '==', selected)
            .onSnapshot(
              (snapshot) => {
                let priceLists = snapshot.docs.map((doc) => {
                  return {
                    priceListID: doc.id,
                    name: doc.data().name,
                    userID: doc.data().userID,
                    added: doc.data().added,
                  };
                });
                setPriceLists(priceLists);
              },
              (error) => console.log(error.message)
            )
        : dataBase.collection('pricelists').onSnapshot(
            (snapshot) => {
              let priceLists = snapshot.docs.map((doc) => {
                return {
                  priceListID: doc.id,
                  name: doc.data().name,
                  userID: doc.data().userID,
                  added: doc.data().added,
                };
              });
              setPriceLists(priceLists);
            },
            (error) => console.log(error.message)
          );
    return () => {
      unsubscribe();
    };
  }, [selected]);
  return { priceLists, setPriceLists };
};
