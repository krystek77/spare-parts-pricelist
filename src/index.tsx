/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { firebase } from './lib/firebase';
import { render } from 'react-dom';
import { GlobalStyles } from './global-styles';
import { App } from './App';
import { ThemeProvider, theme } from './theme';

// function fetchData() {
//   firebase
//     .firestore()
//     .collection('spare-parts')
//     .add({ id: 1, name: 'Uszczelka' });
// }

// fetchData();

render(
  <React.Fragment>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);
