import React from 'react';
import {
  AccordionContainer,
  JumbotronContainer,
  TabsContainer,
} from '../containers';

import { HeaderContainer } from '../containers';
interface IHomePage {}

export const HomePage: React.FC<IHomePage> = () => {
  return (
    <React.Fragment>
      <HeaderContainer bgImage />
      <TabsContainer />
      <JumbotronContainer />
      <AccordionContainer />
    </React.Fragment>
  );
};
