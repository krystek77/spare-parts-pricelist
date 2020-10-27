import React from 'react';
import {
  AccordionContainer,
  JumbotronContainer,
  TabsContainer,
} from '../containers';

interface IHomePage {}

export const HomePage: React.FC<IHomePage> = () => {
  return (
    <React.Fragment>
      <TabsContainer />
      <JumbotronContainer />
      <AccordionContainer />
    </React.Fragment>
  );
};
