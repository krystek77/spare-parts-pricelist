import React from 'react';
import { Jumbotron } from './components/jumbotron';
import { Tabs } from './components/tabs';
import dataJumbotron from './fixtures/jumbo.json';
import dataTabs from './fixtures/tabs.json';

export function App() {
  return (
    <React.Fragment>
      {/** Tabs */}
      <Tabs.Container>
        <Tabs>
          <Tabs.TabGroup>
            {dataTabs.map((item) => (
              <Tabs.Tab key={item.id} id={item.id}>
                {item.label}
              </Tabs.Tab>
            ))}
          </Tabs.TabGroup>
          <Tabs.PanelGroup>
            {dataTabs.map((item) => (
              <Tabs.Panel key={item.id} id={item.id}>
                {item.text}
              </Tabs.Panel>
            ))}
          </Tabs.PanelGroup>
        </Tabs>
      </Tabs.Container>
      {/** Jumbotron */}
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
    </React.Fragment>
  );
}
