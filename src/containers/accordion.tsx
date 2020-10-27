import React from 'react';
import { Accordion } from '../components';
import dataFaqs from '../fixtures/faqs.json';

export const AccordionContainer = () => {
  return (
    <Accordion.Container someProps={'10'}>
      <Accordion>
        <Accordion.Title>Frequenced Asked Questions</Accordion.Title>
        {dataFaqs.map((item) => {
          return (
            <Accordion.List key={item.id}>
              <Accordion.ListItem>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.ListItem>
            </Accordion.List>
          );
        })}
      </Accordion>
    </Accordion.Container>
  );
};
