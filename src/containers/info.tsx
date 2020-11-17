import React from 'react';
import { Info } from '../components';
export const InfoContainer: React.FC<{ course?: number | null }> = React.memo(
  ({ children, course }) => {
    return (
      <Info>
        <Info.Title>Exchange rate</Info.Title>
        <Info.Content>
          <Info.Label>Date:</Info.Label>
          <Info.Body>{new Date().toISOString().slice(0, 10)}</Info.Body>
        </Info.Content>
        {children}
        {!!course && (
          <Info.Content type='CURRENCY'>
            <Info.Label>1 EURO:</Info.Label>
            <Info.Body>{`${course} ZŁ`}</Info.Body>
          </Info.Content>
        )}
      </Info>
    );
  }
);
