import React from 'react';
interface ISelectedSparePartContext {
  selectedSparePart: string;
  setSelectedSparePart: (selectedSparePart: string) => void;
}
const defaultValue: ISelectedSparePartContext = {
  selectedSparePart: '',
  setSelectedSparePart: (selectedSparePart) => {},
};
const SelectedSparePartContext = React.createContext(defaultValue);
const SelectedSparePartContextConsumer = SelectedSparePartContext.Consumer;

const SelectedSparePartContextProvider: React.FC = ({ children }) => {
  const [selectedSparePart, setSelectedSparePart] = React.useState<string>('');
  return (
    <SelectedSparePartContext.Provider
      value={{ selectedSparePart, setSelectedSparePart }}
    >
      {children}
    </SelectedSparePartContext.Provider>
  );
};

const useSelectedSparePartContext = () =>
  React.useContext(SelectedSparePartContext);
export {
  SelectedSparePartContext,
  SelectedSparePartContextConsumer,
  SelectedSparePartContextProvider,
  useSelectedSparePartContext,
};
