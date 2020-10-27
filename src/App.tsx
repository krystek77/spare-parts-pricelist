import React from 'react';
import {
  JumbotronContainer,
  TabsContainer,
  AccordionContainer,
} from './containers';

export function App() {
  return (
    <React.Fragment>
      <AccordionContainer />
      <TabsContainer />
      <JumbotronContainer />
    </React.Fragment>
  );
}
