import './App.scss';
import React from 'react';
import Main from './components/Main';
import { ViewportProvider } from './contexts/context';

function App() {
  return (
    <ViewportProvider>
      <div className="app">
        <div className="app__body">
          <Main />
        </div>
      </div>
    </ViewportProvider>
  );
}

export default App;
