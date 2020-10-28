import React from 'react';
import {
  NavigationContainer,
  AccordionContainer,
  JumbotronContainer,
  TabsContainer,
} from '../containers';

interface IHomePage {}

export const HomePage: React.FC<IHomePage> = () => {
  return (
    <React.Fragment>
      <NavigationContainer />
      <TabsContainer />
      <JumbotronContainer />
      <AccordionContainer />
    </React.Fragment>
  );
};
