import React from 'react';
import { render } from 'react-dom';
import { GlobalStyles } from './global-styles';
import { App } from './App';
import { ThemeProvider, theme } from './theme';

render(
  <React.Fragment>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);
