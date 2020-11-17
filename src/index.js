import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ViewportProvider } from './contexts/contextViewport';
import { StateProvider } from './contexts/StateProvider';
import reducer, { initialState } from './contexts/reducer';

ReactDOM.render(
  <React.StrictMode>
    <ViewportProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </ViewportProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
