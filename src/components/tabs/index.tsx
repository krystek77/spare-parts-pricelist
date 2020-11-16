import React from 'react';
import {
  TabGroup,
  Tab,
  PanelGroup,
  Panel,
  Container,
  Inner,
} from './styles/tabs';

const defaultValueTabsContext = {
  activeTab: 'tab1',
  setActiveTab: (id: string) => {},
};

interface ITabsContext {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = React.createContext<ITabsContext>(defaultValueTabsContext);

const TabsContextProvider: React.FC = (props) => {
  const [activeTab, setActiveTab] = React.useState<string>('tab1');
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </TabsContext.Provider>
  );
};

interface TabsComposition {
  Container: React.FC;
  TabGroup: React.FC<{ children: any }>;
  Tab: React.FC<{
    tab: string;
  }>;
  PanelGroup: React.FC;
  Panel: React.FC<{
    tab: string;
    children: React.ReactChild | React.ReactChildren;
  }>;
}

export const Tabs: React.FC & TabsComposition = (props) => {
  return (
    <TabsContextProvider>
      <Inner>{props.children}</Inner>
    </TabsContextProvider>
  );
};
Tabs.TabGroup = function TabsTabGroup(props) {
  return <TabGroup>{props.children}</TabGroup>;
};
Tabs.Tab = function TabsTab(props) {
  const { activeTab, setActiveTab } = React.useContext<ITabsContext>(
    TabsContext
  );
  return (
    <Tab {...props}>
      <button
        type='button'
        onClick={() => setActiveTab(props.tab)}
        className={activeTab === props.tab ? 'active' : undefined}
      >
        <h2>{props.children}</h2>
      </button>
    </Tab>
  );
};
Tabs.Container = function TabsContainer(props) {
  return <Container>{props.children}</Container>;
};
Tabs.PanelGroup = function TabsPanelGroup(props) {
  return <PanelGroup>{props.children}</PanelGroup>;
};
Tabs.Panel = function TabsPanel(props) {
  const { activeTab } = React.useContext<ITabsContext>(TabsContext);
  return activeTab === props.tab ? (
    <Panel {...props}>{props.children}</Panel>
  ) : null;
};
