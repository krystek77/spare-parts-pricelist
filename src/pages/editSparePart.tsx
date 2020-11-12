/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { auth, dataBase } from '../lib/firebase';
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import {
  NavigationContainer,
  SidebarContainer,
  MainContainer,
  InfoContainer,
  PriceListsOverlay,
} from '../containers';
import { Navigation, ListItems, ContentTitle, Form } from '../components';
import { useAuth, useSpareParts, usePriceLists } from '../hooks';
import {
  useExchangeRateContext,
  useSelectedPriceListsContextValue,
} from '../context';
import * as ROUTES from '../constants/routes';
import {
  CURRENCY,
  stringToNumber,
  calculatePrice,
  isSparePartName,
  isModel,
  isPrice,
  isYear,
  prepareSlug,
} from '../helpers';
interface IRoutesProps {
  /**
   * routes props
   */
  sparePartID: string;
}
interface IEditSparePartPage extends RouteComponentProps<IRoutesProps> {
  /**
   * regular props
   */
}

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

const EditPage: React.FC<IEditSparePartPage> = (props) => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const {
    selectedPriceLists,
    setSelectedPriceLists,
  } = useSelectedPriceListsContextValue();
  const { spareParts } = useSpareParts(selectedPriceLists, authUser.userID);
  const { priceLists } = usePriceLists('');

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

  const { course } = useExchangeRateContext();
  const history = useHistory();
  const { match } = props;

  React.useEffect(() => {
    const updatedSparePart: ISparePart | false | undefined =
      spareParts &&
      spareParts.length > 0 &&
      spareParts.find((item) => item.sparePartID === match.params.sparePartID);

    if (updatedSparePart) {
      // console.log(updatedSparePart);
      // console.log('userID', authUser.userID);
      // console.log('sparePartID', match.params.sparePartID);
      // console.log('priceListID', updatedSparePart.priceListID);

      setName(updatedSparePart.name);
      setModel(updatedSparePart.model);
      setFrom(updatedSparePart.from);
      setTo(updatedSparePart.to);
      setPurchasePrice(
        updatedSparePart.purchasePrice === 0
          ? '0.00'
          : updatedSparePart.purchasePrice.toString()
      );
      setSellingPrice(updatedSparePart.sellingPrice.toString());
      setDescription(updatedSparePart.description);
      setComment(updatedSparePart.comments);
      setCurrency(updatedSparePart.currency);
      setSelectedPriceLists(updatedSparePart.priceListID);
    }
    return () => {};
  }, [
    match.params.sparePartID,
    spareParts,
    authUser.userID,
    setSelectedPriceLists,
  ]);

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
    // console.log('seeling', isPrice(sellingPrice));
  }

  const handleEditSpareParts = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!!course) {
      const updatedSparePart = {
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
        updated: new Date().toISOString().slice(0, 10),
      };

      dataBase
        .collection('spare-parts')
        .doc(match.params.sparePartID)
        .update(updatedSparePart)
        .then(() => {
          setMessage('The spare part was updated successfully');
          setTimeout(() => {
            setMessage('');
            history.push(ROUTES.ADMIN);
          }, 1000);
        })
        .catch((error) => {
          setMessage(error.message);
        });
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
              <ListItems.ListItemButtonLink
                to={ROUTES.BROWSE}
                onClick={() => setSelectedPriceLists('')}
              >
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
        <InfoContainer />
        {/** INFO */}
      </SidebarContainer>
      <MainContainer>
        {/** CONTENT TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>EDIT SPARE PART</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>
            ...{match.params.sparePartID} ...
          </ContentTitle.SubTitle>
        </ContentTitle>
        {/**  CONTENT TITLE */}
        {/** EDIT FORM */}
        {message && <Form.Message>{message}</Form.Message>}
        <Form size={'editSparePart'}>
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
          <Form.Title>Edit Spare Part</Form.Title>
          <Form.BaseForm onSubmit={handleEditSpareParts}>
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
              Edit Spare Part
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
        {/** EDIT FORM */}
      </MainContainer>
    </React.Fragment>
  );
};

export const EditSparePartPage = withRouter(EditPage);
