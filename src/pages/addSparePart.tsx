import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useAuth, usePriceLists } from '../hooks';
import { useSelectedPriceListsContextValue } from '../context';
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

export const AddSparePart: React.FC<IAddSparePart> = () => {
  const [name, setName] = React.useState<string>('');
  const [model, setModel] = React.useState<string>('');
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const [purchasePrice, setPurchasePrice] = React.useState<string>('');
  const [currency, setCurrency] = React.useState<string>(CURRENCY.PL);
  const [priceListName, setPriceListName] = React.useState<string>('');
  const [showPriceListsOverlay, setShowPriceListsOverlay] = React.useState<
    boolean
  >(false);

  const { setAuthUser, initialValue } = useAuth();

  const handleAddSpareParts = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('ADD SPARE PARTS');
  };

  const { priceLists } = usePriceLists('');
  const { setSelectedPriceLists } = useSelectedPriceListsContextValue();

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
        <Form>
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
                onChange={(e) => setName(e.currentTarget.value)}
                onKeyDown={(e) => setName(e.currentTarget.value)}
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
              <Form.InputsGroup>
                <Form.InputLabel htmlFor='pricList'>
                  PricList Category:
                </Form.InputLabel>
                <Form.Input
                  type='text'
                  name='pricList'
                  id='pricList'
                  value={priceListName}
                  placeholder='Enter price list name ...'
                  onChange={(e) => setPriceListName(e.currentTarget.value)}
                  onKeyDown={(e) => setPriceListName(e.currentTarget.value)}
                />
              </Form.InputsGroup>
              <Form.InputsGroup>
                <Form.IconButton
                  type='button'
                  onClick={() =>
                    setShowPriceListsOverlay(!showPriceListsOverlay)
                  }
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
                />
                {/** PRICELISTS OVERLAY */}
              </Form.InputsGroup>
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
            <Form.Break />
            <Form.SubmitButton type='submit' disabled={false}>
              Add Spare Parts
            </Form.SubmitButton>
            <Form.Break />
          </Form.BaseForm>
        </Form>
      </MainContainer>
    </React.Fragment>
  );
};
