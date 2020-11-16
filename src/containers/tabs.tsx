import React from 'react';
import { Tabs } from '../components';
import dataTabs from '../fixtures/tabs.json';

export const TabsContainer = () => {
  return (
    <Tabs.Container>
      <Tabs>
        <Tabs.TabGroup>
          {dataTabs.map((item) => {
            console.log(item.id);
            return (
              <Tabs.Tab key={item.id} tab={item.id}>
                {item.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.TabGroup>
        <Tabs.PanelGroup>
          {dataTabs.map((item) => (
            <Tabs.Panel key={item.id} tab={item.id}>
              {item.text}
            </Tabs.Panel>
          ))}
        </Tabs.PanelGroup>
      </Tabs>
    </Tabs.Container>
  );
};
