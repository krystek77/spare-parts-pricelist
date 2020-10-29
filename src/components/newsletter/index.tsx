import React from 'react';
import {
  Container,
  Inner,
  Input,
  Button,
  Text,
  Break,
} from './styles/newsletter';

interface INewsletterComposition {
  Input: React.FC<{ type: string; placeholder: string }>;
  Button: React.FC<{ type: 'button'; onClick?: () => void }>;
  Text: React.FC;
  Break: React.FC;
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
