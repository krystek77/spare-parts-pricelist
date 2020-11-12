import React from 'react';
import { dataBase } from '../lib/firebase';

interface ISpareParts {
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
}
export const useSpareParts = (
  selectedPriceLists: string = '',
  currentUser: string = ''
) => {
  const [spareParts, setSpareParts] = React.useState<ISpareParts[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    let query =
      selectedPriceLists !== '' && currentUser === ''
        ? dataBase
            .collection('spare-parts')
            .where('priceListID', '==', selectedPriceLists)
            .get()
        : selectedPriceLists === '' && currentUser !== ''
        ? dataBase
            .collection('spare-parts')
            .where('userID', '==', currentUser)
            .get()
        : selectedPriceLists !== '' && currentUser !== ''
        ? dataBase
            .collection('spare-parts')
            .where('userID', '==', currentUser)
            .where('priceListID', '==', selectedPriceLists)
            .get()
        : dataBase.collection('spare-parts').get();

    query
      .then((snapshot) => {
        const spareParts: ISpareParts[] = [];
        // const allSpareParts = snapshot.docs.map((doc) => {
        //   return {
        //     sparePartID: doc.id,
        //     comments: doc.data().comments,
        //     currency: doc.data().currency,
        //     description: doc.data().description,
        //     from: doc.data().from,
        //     model: doc.data().model,
        //     name: doc.data().name,
        //     priceListID: doc.data().priceListID,
        //     purchasePrice: doc.data()['purchase-price'],
        //     sellingPrice: doc.data()['selling-price'],
        //     to: doc.data().to,
        //     userID: doc.data().userID,
        //   };
        // });
        // console.log('useSpareParts', allSpareParts);
        // if (JSON.stringify(allSpareParts) !== JSON.stringify(spareParts)) {
        //   setSpareParts(spareParts);
        // }
        snapshot.forEach((doc) => {
          const sparePart: ISpareParts = {
            sparePartID: doc.id,
            comments: doc.data().comments,
            currency: doc.data().currency,
            description: doc.data().description,
            from: doc.data().from,
            model: doc.data().model,
            name: doc.data().name,
            priceListID: doc.data().priceListID,
            purchasePrice: doc.data()['purchase-price'],
            sellingPrice: doc.data()['selling-price'],
            to: doc.data().to,
            userID: doc.data().userID,
            slug: doc.data().slug,
            added: doc.data().added,
          };
          spareParts.push(sparePart);
        });
        setSpareParts(spareParts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    return () => {};
  }, [currentUser, selectedPriceLists]);
  return { spareParts, setSpareParts, isLoading };
};
