import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const API_ROOT = "/api/v1/"

ReactDOM.render(
  <App apiRoot={API_ROOT} />,
  document.getElementById('root')
);
