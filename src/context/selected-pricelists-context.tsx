import React from 'react';

interface ISelectedPriceListsContext {
  selectedPriceLists: string;
  setSelectedPriceLists: (selected: string) => void;
}
const defaultValue: ISelectedPriceListsContext = {
  selectedPriceLists: '',
  setSelectedPriceLists: (selected) => {},
};
const SelectedPriceListsContext = React.createContext(defaultValue);
const SelectedPriceListsContextConsumer = SelectedPriceListsContext.Consumer;

const SelectedPriceListsContextProvider: React.FC = ({ children }) => {
  const [selectedPriceLists, setSelectedPriceLists] = React.useState<string>(
    ''
  );
  return (
    <SelectedPriceListsContext.Provider
      value={{ selectedPriceLists, setSelectedPriceLists }}
    >
      {children}
    </SelectedPriceListsContext.Provider>
  );
};

const useSelectedPriceListsContextValue = () =>
  React.useContext(SelectedPriceListsContext);

export {
  SelectedPriceListsContext,
  SelectedPriceListsContextProvider,
  SelectedPriceListsContextConsumer,
  useSelectedPriceListsContextValue,
};
