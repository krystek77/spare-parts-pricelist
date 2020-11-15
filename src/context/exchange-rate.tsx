import React from 'react';

const URL_API_EURO =
  'http://api.nbp.pl/api/exchangerates/rates/C/EUR?format=JSON';

interface IExchangeRateContext {
  course: number | null;
}
const defaultValue: IExchangeRateContext = {
  course: null,
};

const ExchangeRateContext = React.createContext(defaultValue);

const ExchangeRateContextProvider: React.FC = ({ children }) => {
  const [course, setCourse] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(URL_API_EURO);
        const data = await response.json();
        const euro = data.rates[0].ask;
        setCourse(euro);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchangeRate();
    return () => {};
  }, []);

  return (
    <ExchangeRateContext.Provider value={{ course }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

const ExchangeRateContextConsumer = ExchangeRateContext.Consumer;
const useExchangeRateContext = () => React.useContext(ExchangeRateContext);

export {
  ExchangeRateContext,
  ExchangeRateContextProvider,
  ExchangeRateContextConsumer,
  useExchangeRateContext,
};
