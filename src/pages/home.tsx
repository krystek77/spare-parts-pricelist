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
          <Navigation.ButtonLink to={ROUTES.SIGNIN}>
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
            <Newsletter.Input type='text' placeholder='Enter your email' />
            <Newsletter.Button type='button'>Subscribe</Newsletter.Button>
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
