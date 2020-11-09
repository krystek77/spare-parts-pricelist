import React from 'react';
import { dataBase } from '../lib/firebase';
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { useAuth, usePriceLists } from '../hooks';
import {
  useSelectedPriceListsContextValue,
  useExchangeRateContext,
} from '../context';
import { auth } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  PriceListsOverlay,
} from '../containers';
import { Navigation, ListItems, Form } from '../components';
import * as ROUTES from '../constants/routes';
import { CURRENCY } from '../helpers';

interface IAddSparePart {}

const roundToDecimals = (number: number): number =>
  Math.round((number + Number.EPSILON) * 100) / 100;

const stringToNumber = (s: string): number | undefined => {
  let num = parseFloat(s);
  if (isNaN(num)) return 0;
  return roundToDecimals(num);
};

const calculatePrice = (price: string, course: number): number | undefined => {
  let purchasePrice = stringToNumber(price);
  if (purchasePrice) {
    const inPL = roundToDecimals(purchasePrice * course);
    return inPL >= 500.0
      ? roundToDecimals(inPL * 1.35)
      : roundToDecimals(inPL * 1.65);
  }
  return 0;
};
const isSparePartName = (name: string): boolean => {
  const regExp = /^[a-zA-Ząćęłńóśźż\s]{10,}/;
  return !!name.match(regExp) ? true : false;
};
const isModel = (model: string): boolean => {
  const regExp = /^[A-Z]{1,}[0-9]*-[0-9]+/;
  return !!model.match(regExp) ? true : false;
};
const isYear = (year: string): boolean => {
  const regExp = /^([0-9]{4}$)/;
  return !!year.match(regExp) ? true : false;
};
const isPrice = (price: string) => {
  const regExp = /^([0-9]+\.?[0-9]{2}$)/;
  return !!price.match(regExp) ? true : false;
};

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
  const { course } = useExchangeRateContext(); //returns null until it downloads

  const selectedPriceList = priceLists.find(
    (item) => item.priceListID === selectedPriceLists
  );
  const selectedPriceListName =
    selectedPriceList && selectedPriceList.name
      ? selectedPriceList.name
      : 'PriceList no chosen';
  /**
   * VALIDATION
   */
  // console.log('name', isSparePartName(name));
  // console.log('model', isModel(model));
  // console.log('from', isYear(from));
  // console.log('to', isYear(to));
  // console.log('price', isPrice(purchasePrice));

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
    // console.log('seeling', isPrice(sellingPrice));
  }

  const handleAddSpareParts = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!!course) {
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
          currency === CURRENCY.PL
            ? stringToNumber(sellingPrice)
            : calculatePrice(purchasePrice, course),
        userID: authUser.userID,
        added: new Date().toISOString().slice(0, 10),
      };
      console.log(newSparePart);
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
    }
  };

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <Navigation.SignoutButton
          type='button'
          onClick={() => {
            auth
              .signOut()
              .then(() => {
                localStorage.removeItem('authUser');
                setAuthUser(initialValue);
                // history.push(ROUTES.HOME);
              })
              .catch((error) => {
                console.log('Sign out failed');
              });
          }}
        >
          sign out
        </Navigation.SignoutButton>
      </NavigationContainer>
      <SidebarContainer>
        {/** LINKS */}
        <ListItems>
          <ListItems.Title>LINKS</ListItems.Title>
          <ListItems.List>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_USER}>
                Add User
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADD_SPARE_PART}>
                Add Spare Part
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.BROWSE}>
                Browese PriceLists
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
            <ListItems.ListItem>
              <ListItems.ListItemButtonLink to={ROUTES.ADMIN}>
                Admin
              </ListItems.ListItemButtonLink>
            </ListItems.ListItem>
          </ListItems.List>
        </ListItems>
        {/** LINKS */}
      </SidebarContainer>
      <MainContainer>
        {message && <Form.Message>{message}</Form.Message>}
        <Form>
          <Form.ClearButton
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
              <Form.InputLabel htmlFor='From'>Model</Form.InputLabel>
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
              <Form.IconButton
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
            <Form.SubmitButton type='submit' disabled={!isValidForm}>
              Add Spare Parts
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
      </MainContainer>
    </React.Fragment>
  );
};
