import React from 'react';
import { dataBase } from '../lib/firebase';
import { Form, CustomButton } from '../components';
import { getAuthUser } from '../helpers';

interface IAddPriceList {
  showAddPriceList?: boolean;
}
interface IPriceList {
  name: string;
  userID: string;
  added: string;
}
export const AddPriceList: React.FC<IAddPriceList> = React.memo(
  ({ showAddPriceList = false }) => {
    const [priceListName, setPriceListName] = React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(showAddPriceList);
    const [message, setMessage] = React.useState<string>('');

    const authUser = getAuthUser();

    const handleAddPriceList = (e: React.SyntheticEvent) => {
      e.preventDefault();
      const newPriceList: IPriceList = {
        name: priceListName,
        userID: authUser.userID,
        added: new Date().toISOString().slice(0, 10),
      };
      /**
       * TODO: Add pricelist if it does not exist
       */
      dataBase
        .collection('pricelists')
        .where('name', '==', priceListName)
        .get()
        .then((result) => {
          if (result.size === 0)
            return dataBase.collection('pricelists').add(newPriceList);
          throw new Error(
            `You can not to add the ${priceListName} pricelist because it exists`
          );
        })
        .then(() => {
          setTimeout(() => {
            setMessage('');
          }, 1000);
          setMessage(`The ${priceListName} added successfully`);
          setPriceListName('');
          setShow(false);
        })
        .catch((error) => {
          setMessage(error.message);
          setTimeout(() => {
            setMessage('');
            setShow(false);
          }, 1000);
        });
      // dataBase
      //   .collection('pricelists')
      //   .add(newPriceList)
      //   .then(() => {
      //     setTimeout(() => {
      //       setMessage('');
      //     }, 1000);
      //     setMessage('Price list added');
      //     setPriceListName('');
      //     setShow(false);
      //   })
      //   .catch((error) => {
      //     setMessage(error.message);
      //   });
    };

    return (
      <React.Fragment>
        {message && <Form.Message>{message}</Form.Message>}
        {show && (
          <React.Fragment>
            <Form size={'addPriceList'}>
              <Form.Title>Add Price List</Form.Title>
              <Form.BaseForm onSubmit={(e) => handleAddPriceList(e)}>
                <Form.Input
                  type='text'
                  id='priceListName'
                  name='priceListName'
                  value={priceListName}
                  placeholder='Enter name of pricelist'
                  onChange={(e) => setPriceListName(e.currentTarget.value)}
                  onKeyDown={(e) => setPriceListName(e.currentTarget.value)}
                />
                <Form.InputsGroup></Form.InputsGroup>
                <Form.Break />
                <Form.InputsGroup>
                  <Form.CustomButton type='submit' btn={'ADD'}>
                    +ADD
                  </Form.CustomButton>
                  <Form.CustomButton
                    type='button'
                    btn={'CANCEL'}
                    onClick={() => {
                      setPriceListName('');
                      setShow(false);
                    }}
                  >
                    CANCEL
                  </Form.CustomButton>
                </Form.InputsGroup>
              </Form.BaseForm>
            </Form>
          </React.Fragment>
        )}
        <Form.InputsGroup>
          <CustomButton onClick={() => setShow(!show)}>
            +ADD PRICE LIST
          </CustomButton>
        </Form.InputsGroup>
      </React.Fragment>
    );
  }
);
