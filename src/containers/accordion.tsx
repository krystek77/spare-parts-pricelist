import React from 'react';
import { Accordion } from '../components';

export const AccordionContainer = () => {
  return (
    <Accordion.Container someProps={'10'}>
      <Accordion>
        <Accordion.Title>Frequenced Asked Questions</Accordion.Title>
        <Accordion.List>
          <Accordion.ListItem>
            <Accordion.Header>Question one</Accordion.Header>
            <Accordion.Body>
              Praesent sapien massa, convallis a pellentesque nec, egestas non
              nisi. Donec sollicitudin molestie malesuada. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit
              amet ligula.
            </Accordion.Body>
          </Accordion.ListItem>
        </Accordion.List>
        <Accordion.List>
          <Accordion.ListItem>
            <Accordion.Header>Question two</Accordion.Header>
            <Accordion.Body>
              Praesent sapien massa, convallis a pellentesque nec, egestas non
              nisi. Donec sollicitudin molestie malesuada. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit
              amet ligula.
            </Accordion.Body>
          </Accordion.ListItem>
        </Accordion.List>
      </Accordion>
    </Accordion.Container>
  );
};
