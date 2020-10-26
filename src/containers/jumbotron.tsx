import React from 'react';
import { Jumbotron } from '../components/jumbotron';
import dataJumbotron from '../fixtures/jumbo.json';

export const JumbotronContainer = () => {
  return (
    <Jumbotron.Container>
      {dataJumbotron.map((item) => {
        return (
          <Jumbotron key={item.id} direction={item.direction}>
            <Jumbotron.Pane>
              <Jumbotron.Title>{item.title}</Jumbotron.Title>
              <Jumbotron.SubTitle>{item.subtitle}</Jumbotron.SubTitle>
            </Jumbotron.Pane>
            <Jumbotron.Pane>
              <Jumbotron.Image src={item.img} alt={item.alt} />
            </Jumbotron.Pane>
          </Jumbotron>
        );
      })}
    </Jumbotron.Container>
  );
};
