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
    console.log('[usePriceList] - useEffect');

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

    // if (selected !== '') {
    //   let query = dataBase
    //     .collection('pricelists')
    //     .where('userID', '==', selected)
    //     .onSnapshot((snapshot) => {
    //       console.log(snapshot);
    //       let priceLists = snapshot.docs.map((doc) => {
    //         return {
    //           priceListID: doc.id,
    //           name: doc.data().name,
    //           userID: doc.data().userID,
    //         };
    //       });
    //       setPriceLists(priceLists);
    //     });
    // } else {
    //   let query = dataBase.collection('pricelists').onSnapshot((snapshot) => {
    //     console.log(snapshot);
    //     let priceLists = snapshot.docs.map((doc) => {
    //       return {
    //         priceListID: doc.id,
    //         name: doc.data().name,
    //         userID: doc.data().userID,
    //       };
    //     });
    //     setPriceLists(priceLists);
    //   });
    // }
    // let query = dataBase.collection('pricelists').get();
    // query =
    //   selected !== ''
    //     ? dataBase
    //         .collection('pricelists')
    //         .where('userID', '==', selected)
    //         .get()
    //     : query;
    // query
    //   .then((snapshot) => {
    //     const priceLists: IPriceLists[] = [];
    //     snapshot.forEach((doc) => {
    //       const priceList: IPriceLists = {
    //         priceListID: doc.id,
    //         name: doc.data().name,
    //         userID: doc.data().userID,
    //       };
    //       priceLists.push(priceList);
    //     });
    //     setPriceLists(priceLists);
    //   })
    //   .catch(() => console.log('CAN NOT GET PRICELISTS CATEGORIES'));
    return () => {
      unsubscribe();
    };
  }, [selected]);
  return { priceLists, setPriceLists };
};
