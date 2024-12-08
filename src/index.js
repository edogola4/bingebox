import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import UserProvider from './context/auth.context';

import './index.scss';

const root = reactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
