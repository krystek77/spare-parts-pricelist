import React from 'react';
import {
  AccordionContainer,
  JumbotronContainer,
  TabsContainer,
  HeaderContainer,
  NavigationContainer,
} from '../containers';
import { Header, Newsletter, Navigation } from '../components';
import * as ROUTES from '../constants/routes';

interface IHomePage {}

export const HomePage: React.FC<IHomePage> = () => {
  return (
    <React.Fragment>
      <HeaderContainer bgImage>
        <NavigationContainer>
          <Navigation.AriaLabeledBy id='signIn'>
            Sign in
          </Navigation.AriaLabeledBy>
          <Navigation.ButtonLink
            aria-label='Sign in'
            aria-labelledby='signIn'
            to={ROUTES.SIGNIN}
          >
            sign in
          </Navigation.ButtonLink>
        </NavigationContainer>
        <Header.Content>
          <Header.Title>
            Browse the spare parts priclist anytime and anywhere.
          </Header.Title>
          <Header.SubTitle>
            Add, delete, edit pricelist category and spare parts
          </Header.SubTitle>
          <Newsletter>
            <Newsletter.Label htmlFor='emailForNewsletter'>
              Enter email to send newsletter
            </Newsletter.Label>
            <Newsletter.Input
              id='emailForNewsletter'
              type='text'
              placeholder='Enter your email'
            />
            <Newsletter.AriaLabeledBy id='newsletter'>
              Subscribe to newsletter
            </Newsletter.AriaLabeledBy>
            <Newsletter.Button
              aria-label='newsletter'
              aria-labelledby='newsletter'
              type='button'
            >
              Subscribe
            </Newsletter.Button>
            <Newsletter.Break />
            <Newsletter.Text>
              We are starting to be up to date. Enter email and subscribe to
              newsletter
            </Newsletter.Text>
          </Newsletter>
        </Header.Content>
      </HeaderContainer>
      <TabsContainer />
      <JumbotronContainer />
      <AccordionContainer />
    </React.Fragment>
  );
};
