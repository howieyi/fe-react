import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/app.jsx';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('water-app'),
);
