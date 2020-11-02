import React from 'react';
import { Container, Inner } from './styles/main';

interface IMain {}
export const Main: React.FC<IMain> = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};
