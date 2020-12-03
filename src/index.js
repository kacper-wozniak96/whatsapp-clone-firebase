import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ViewportProvider } from './contexts/contextViewport';
import { UserStateProvider } from './contexts/contextUser/UserStateProvider';

ReactDOM.render(
  <React.StrictMode>
    <ViewportProvider>
      <UserStateProvider>
        <App />
      </UserStateProvider>
    </ViewportProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
