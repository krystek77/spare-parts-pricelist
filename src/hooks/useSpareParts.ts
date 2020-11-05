import React from 'react';
import { dataBase } from '../lib/firebase';

interface ISpareParts {
  sparePartId: string;
  comments: string;
  currency: string;
  description: string;
  from: string;
  isCalculated: boolean;
  model: string;
  name: string;
  priceListID: string;
  purchasePrice: string;
  sellingPrice: string;
  to: string;
  userID: string;
}
export const useSpareParts = (
  selectedPriceLists: string = '',
  currentUser: string = ''
) => {
  const [spareParts, setSpareParts] = React.useState<ISpareParts[]>([]);
  React.useEffect(() => {
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

        snapshot.forEach((doc) => {
          const sparePart: ISpareParts = {
            sparePartId: doc.id,
            comments: doc.data().comments,
            currency: doc.data().currency,
            description: doc.data().description,
            from: doc.data().from,
            isCalculated: doc.data().isCalculated,
            model: doc.data().model,
            name: doc.data().name,
            priceListID: doc.data().priceListID,
            purchasePrice: doc.data()['purchase-price'],
            sellingPrice: doc.data()['selling-price'],
            to: doc.data().to,
            userID: doc.data().userID,
          };
          spareParts.push(sparePart);
        });
        setSpareParts(spareParts);
      })
      .catch((error) => console.log(error));

    return () => {
      console.log('CLEAN SIDE EFFECTS');
    };
  }, [currentUser, selectedPriceLists]);
  return { spareParts, setSpareParts };
};
