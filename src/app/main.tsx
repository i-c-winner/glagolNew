import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {router} from './rout/router';
import React from "react";
import '../shared/styles/index.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import { theme } from '../shared/styles/theme';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './i18n/i18n'

const container = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(container).render(
  <ThemeProvider theme={createTheme(theme)}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
