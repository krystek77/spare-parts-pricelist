import React from 'react';
import { Accordion } from '../components';
import dataFaqs from '../fixtures/faqs.json';
import { Newsletter } from '../components';

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
        <Newsletter>
          <Newsletter.Text>
            We are starting to be up to date. Enter email and subscribe to
            newsletter
          </Newsletter.Text>
          <Newsletter.Break />
          <Newsletter.Label htmlFor='emailForNewsletterFooter'>
            Enter email to send newsletter
          </Newsletter.Label>
          <Newsletter.Input
            id='emailForNewsletterFooter'
            type='text'
            placeholder='Enter your email'
          />
          <Newsletter.AriaLabeledBy id='newsletterFooter'>
            Subscribe to newsletter
          </Newsletter.AriaLabeledBy>
          <Newsletter.Button
            aria-label='Newsletter'
            aria-labelledby='newsletterFooter'
            type='button'
          >
            Subscribe
          </Newsletter.Button>
        </Newsletter>
      </Accordion>
    </Accordion.Container>
  );
};
