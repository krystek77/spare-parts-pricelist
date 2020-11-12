import React from 'react';
import { Form, CustomButton } from '../components';

export const AddPriceList = ({ showAddPriceList = false }) => {
  const [priceListName, setPriceListName] = React.useState<string>('');
  const [show, setShow] = React.useState(showAddPriceList);
  return (
    <React.Fragment>
      {show && (
        <Form>
          <Form.Title>Add Price List</Form.Title>
          <Form.BaseForm
            onSubmit={(e) => {
              e.preventDefault();
              console.log('ADD PRICE LIST');
            }}
          >
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
                onClick={() => console.log('CLOSE FORM TO ADD PRICELIST')}
              >
                CANCEL
              </Form.CustomButton>
            </Form.InputsGroup>
          </Form.BaseForm>
        </Form>
      )}
      <Form.InputsGroup>
        <CustomButton
          onClick={() => {
            console.log('OPEN FORM TO ADD PRICELIST');
            setShow(!show);
          }}
        >
          +ADD PRICE LIST
        </CustomButton>
      </Form.InputsGroup>
    </React.Fragment>
  );
};
