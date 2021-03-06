import React from 'react';
import { dataBase } from '../lib/firebase';
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { useAuth, usePriceLists } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  PriceListsOverlay,
  TitlePageContainer,
  MenuContainer,
  SignOutContainer,
} from '../containers';
import { Form } from '../components';
import {
  CURRENCY,
  stringToNumber,
  isSparePartName,
  isModel,
  isPrice,
  isYear,
  prepareSlug,
} from '../helpers';

interface IAddSparePart {}

export const AddSparePart: React.FC<IAddSparePart> = () => {
  const [name, setName] = React.useState<string>('');
  const [model, setModel] = React.useState<string>('');
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const [purchasePrice, setPurchasePrice] = React.useState<string>('');
  const [sellingPrice, setSellingPrice] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');
  const [currency, setCurrency] = React.useState<string>(CURRENCY.PL);
  const [showPriceListsOverlay, setShowPriceListsOverlay] = React.useState<
    boolean
  >(false);
  const [addDescription, setAddDescription] = React.useState<boolean>(false);
  const [addComment, setAddComment] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const { authUser, setAuthUser, initialValue } = useAuth(); //maybe from localstorage
  const { priceLists } = usePriceLists('');
  const {
    selectedPriceLists,
    setSelectedPriceLists,
  } = useSelectedPriceListsContextValue();

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const selectedPriceListName =
    selectedPriceList && selectedPriceList.name
      ? selectedPriceList.name
      : 'PriceList no chosen';

  let isValidForm =
    isSparePartName(name) &&
    isModel(model) &&
    isYear(from) &&
    isYear(to) &&
    selectedPriceLists &&
    isPrice(purchasePrice);

  if (sellingPrice !== '') {
    isValidForm =
      isSparePartName(name) &&
      isModel(model) &&
      isYear(from) &&
      isYear(to) &&
      selectedPriceLists &&
      isPrice(purchasePrice) &&
      isPrice(sellingPrice);
  }

  const handleAddSpareParts = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newSparePart = {
      comments: comment,
      currency: currency,
      description: description,
      name: name,
      model: model,
      from: from,
      to: to,
      priceListID: selectedPriceLists,
      'purchase-price': stringToNumber(purchasePrice),
      'selling-price':
        currency === CURRENCY.PL ? stringToNumber(sellingPrice) : 0,
      userID: authUser.userID,
      added: new Date().toISOString().slice(0, 10),
      slug: prepareSlug(name, model),
    };

    
    dataBase
      .collection('spare-parts')
      .add(newSparePart)
      .then(() => {
        setMessage('Spare part added successfully');
        setName('');
        setModel('');
        setFrom('');
        setTo('');
        setCurrency(CURRENCY.PL);
        setPurchasePrice('');
        setSellingPrice('');
        setDescription('');
        setComment('');
        setAddComment(false);
        setAddDescription(false);
      })
      .catch((error) => setMessage(error.message));
  };

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <SignOutContainer
          setAuthUser={setAuthUser}
          initialValue={initialValue}
        />
      </NavigationContainer>
      <SidebarContainer>
        {/** MENU CONTAINER */}
        <MenuContainer setSelectedPriceLists={setSelectedPriceLists} />
        {/** MENU CONTAINER */}
      </SidebarContainer>
      <MainContainer>
        {/** PAGE TITLE */}
        <TitlePageContainer title='Add spare part' subTitle='-//-' />
        {/** PAGE TITLE */}
        {message && <Form.Message>{message}</Form.Message>}
        <Form size={'addSparePart'}>
          <Form.AriaLabeledBy id='clearForm'>Clear form</Form.AriaLabeledBy>
          <Form.ClearButton
            aria-label='Clear form'
            aria-labelledby='clearForm'
            type='button'
            onClick={() => {
              setMessage('');
              setName('');
              setModel('');
              setFrom('');
              setTo('');
              setCurrency(CURRENCY.PL);
              setPurchasePrice('');
              setSellingPrice('');
              setDescription('');
              setComment('');
              setAddComment(false);
              setAddDescription(false);
            }}
          >
            CLEAR
          </Form.ClearButton>
          <Form.Title>Add Spare Parts</Form.Title>
          <Form.BaseForm onSubmit={handleAddSpareParts}>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor='name'>Name:</Form.InputLabel>
              <Form.Input
                type='text'
                name='name'
                id='name'
                value={name}
                placeholder='Enter spare part name'
                onChange={(e) => {
                  setName(e.currentTarget.value);
                  setMessage('');
                }}
                onKeyDown={(e) => {
                  setName(e.currentTarget.value);
                  setMessage('');
                }}
              />
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputLabel htmlFor='model'>Model</Form.InputLabel>
              <Form.Input
                type='text'
                name='model'
                id='model'
                value={model}
                placeholder='Enter machine model'
                onChange={(e) => setModel(e.currentTarget.value)}
                onKeyDown={(e) => setModel(e.currentTarget.value)}
              />
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.InputsGroup>
                <Form.InputLabel htmlFor='from'>From:</Form.InputLabel>
                <Form.Input
                  type='text'
                  name='from'
                  id='from'
                  value={from}
                  placeholder='1998'
                  onChange={(e) => setFrom(e.currentTarget.value)}
                  onKeyDown={(e) => setFrom(e.currentTarget.value)}
                />
              </Form.InputsGroup>
              <Form.InputsGroup>
                <Form.InputLabel htmlFor='to'>to:</Form.InputLabel>
                <Form.Input
                  type='text'
                  name='to'
                  id='to'
                  value={to}
                  placeholder='2010'
                  onChange={(e) => setTo(e.currentTarget.value)}
                  onKeyDown={(e) => setTo(e.currentTarget.value)}
                />
              </Form.InputsGroup>
            </Form.InputsGroup>
            <Form.Break />
            <Form.InputsGroup>
              <Form.InputLabel>PriceList Category:</Form.InputLabel>
              <Form.AriaLabeledBy id='chooseCategory'>
                Choose category
              </Form.AriaLabeledBy>
              <Form.IconButton
                aria-label='Choose category'
                aria-labelledby='chooseCategory'
                type='button'
                onClick={() => setShowPriceListsOverlay(!showPriceListsOverlay)}
                onKeyDown={() =>
                  setShowPriceListsOverlay(!showPriceListsOverlay)
                }
              >
                <FaClipboardList />
              </Form.IconButton>
              {/** PRICELISTS OVERLAY */}
              <PriceListsOverlay
                list={priceLists}
                setSelectedPriceLists={setSelectedPriceLists}
                showPriceListsOverlay={showPriceListsOverlay}
                setShowPriceListsOverlay={setShowPriceListsOverlay}
              />
              {/** PRICELISTS OVERLAY */}
              <Form.InputLabel>{selectedPriceListName}</Form.InputLabel>
            </Form.InputsGroup>
            <Form.Break />
            <Form.InputsGroup>
              <Form.InputLabel htmlFor='purchase'>
                Purchase price:
              </Form.InputLabel>
              <Form.Input
                type='number'
                name='purchase'
                id='purchase'
                value={purchasePrice}
                placeholder='100.10'
                onChange={(e) => setPurchasePrice(e.currentTarget.value)}
                onKeyDown={(e) => setPurchasePrice(e.currentTarget.value)}
              />
            </Form.InputsGroup>
            <Form.Break />
            <Form.InputsGroup>
              <Form.RadioInput
                type='radio'
                id={CURRENCY.PL}
                value={CURRENCY.PL}
                name={CURRENCY.PL}
                checked={currency === CURRENCY.PL}
                onChange={(e) => setCurrency(e.currentTarget.value)}
                onKeyDown={(e) => setCurrency(e.currentTarget.value)}
              />
              <Form.InputLabel htmlFor={CURRENCY.PL}>
                Purchase price given in <strong>{CURRENCY.PL}</strong>
              </Form.InputLabel>
            </Form.InputsGroup>
            <Form.InputsGroup>
              <Form.RadioInput
                type='radio'
                id={CURRENCY.EUR}
                value={CURRENCY.EUR}
                name={CURRENCY.EUR}
                checked={currency === CURRENCY.EUR}
                onChange={(e) => setCurrency(e.currentTarget.value)}
                onKeyDown={(e) => setCurrency(e.currentTarget.value)}
              />
              <Form.InputLabel htmlFor='EUR'>
                Purchase price given in <strong>{CURRENCY.EUR}</strong>
              </Form.InputLabel>
            </Form.InputsGroup>
            {currency === CURRENCY.PL && (
              <React.Fragment>
                <Form.Break />
                <Form.InputsGroup>
                  <Form.InputLabel htmlFor='selling'>
                    Selling price:
                  </Form.InputLabel>
                  <Form.Input
                    type='number'
                    name='selling'
                    id='selling'
                    value={sellingPrice}
                    placeholder='450.00'
                    onChange={(e) => setSellingPrice(e.currentTarget.value)}
                    onKeyDown={(e) => setSellingPrice(e.currentTarget.value)}
                  />
                </Form.InputsGroup>
              </React.Fragment>
            )}
            <Form.Break />
            <Form.InputsGroup>
              <Form.IconButton
                type='button'
                onClick={() => setAddDescription(!addDescription)}
                onKeyDown={() => setAddDescription(!addDescription)}
              >
                <FaPlus />
                <span>Add Description</span>
              </Form.IconButton>
              <Form.IconButton
                type='button'
                onClick={() => setAddComment(!addComment)}
                onKeyDown={() => setAddComment(!addComment)}
              >
                <FaPlus />
                <span>Add Comment</span>
              </Form.IconButton>
            </Form.InputsGroup>
            {addDescription && (
              <React.Fragment>
                <Form.Break />
                <Form.InputLabel htmlFor='description'>
                  Description:
                </Form.InputLabel>
                <Form.InputsGroup>
                  <Form.TextAreaInput
                    name='description'
                    id='description'
                    // maxLength={250}
                    minLength={10}
                    rows={2}
                    // cols={50}
                    value={description}
                    placeholder='Enter description...'
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    onKeyDown={(e) => setDescription(e.currentTarget.value)}
                  />
                </Form.InputsGroup>
              </React.Fragment>
            )}
            {addComment && (
              <React.Fragment>
                <Form.Break />
                <Form.InputLabel htmlFor='comment'>Comment:</Form.InputLabel>
                <Form.InputsGroup>
                  <Form.TextAreaInput
                    name='comment'
                    id='comment'
                    // maxLength={250}
                    minLength={10}
                    rows={2}
                    // cols={50}
                    value={comment}
                    placeholder='Enter comment...'
                    onChange={(e) => setComment(e.currentTarget.value)}
                    onKeyDown={(e) => setComment(e.currentTarget.value)}
                  />
                </Form.InputsGroup>
              </React.Fragment>
            )}

            <Form.Break />
            <Form.AriaLabeledBy id='addSparePart'>
              Add spare part
            </Form.AriaLabeledBy>
            <Form.SubmitButton
              aria-label='Add spare part'
              aria-labelledby='addSparePart'
              type='submit'
              disabled={!isValidForm}
            >
              Add Spare Parts
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
      </MainContainer>
    </React.Fragment>
  );
};

export default AddSparePart;
