import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline';
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { router } from './Routes';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const responsiveTheme = responsiveFontSizes(theme)
root.render(
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
