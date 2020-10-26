import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import theme from './theme'

let themeNew=responsiveFontSizes(theme)
ReactDOM.render(
    <ThemeProvider theme={themeNew}>
        <App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
