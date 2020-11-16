import React from 'react';
import {
  Container,
  Inner,
  Input,
  Button,
  Text,
  Break,
  AriaLabeledBy,
  Label,
} from './styles/newsletter';

interface INewsletterComposition {
  Input: React.FC<{ id?: string; type: string; placeholder: string }>;
  Button: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    type: 'button';
    onClick?: () => void;
  }>;
  Text: React.FC;
  Break: React.FC;
  AriaLabeledBy: React.FC<{ id?: string }>;
  Label: React.FC<{ htmlFor?: string }>;
}

export const Newsletter: React.FC & INewsletterComposition = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

Newsletter.Input = function NewsletterInput({ ...restProps }) {
  return <Input {...restProps} />;
};
Newsletter.Button = function NewsletterButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
Newsletter.Text = function NewsletterText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
Newsletter.Break = function NewsletterBreak({ ...restProps }) {
  return <Break {...restProps} />;
};
Newsletter.AriaLabeledBy = function NewsletterAriaLabeledBy({
  children,
  ...restProps
}) {
  return <AriaLabeledBy {...restProps}>{children}</AriaLabeledBy>;
};
Newsletter.Label = function NewsletterLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};
