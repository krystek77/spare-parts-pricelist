import React from 'react';
import { Container, Inner } from './styles/spinner';
export const Spinner: React.FC = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};
