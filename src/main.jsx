import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AccessControlProvider } from './context/AccessControllContext.jsx';
import './utils/i18n.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AccessControlProvider>
    <App />
  </AccessControlProvider>
);
