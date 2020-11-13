/* eslint-disable prettier/prettier */
import './App.scss';
import React, { useEffect } from 'react';
// import Main from './components/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useViewport } from './contexts/context';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';

function App() {

  const { windowWidth } = useViewport();
  const breakpoint = 620;

  const adjustingVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('load', adjustingVh);

  useEffect(() => {
    window.addEventListener('resize', adjustingVh);
    return () => window.removeEventListener('resize', adjustingVh);
  }, []);



  return (
    <div className="app">
      <div className="app__body">
        <Router>
          {windowWidth < breakpoint ? (
            <Switch>
              <Route exact path="/">
                <Sidebar />
              </Route>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          ) : (
              <Switch>
                <Route exact path="/">
                  <Sidebar />
                </Route>
                <Route path="/rooms/:roomId">
                  <Sidebar />
                  <Chat />
                </Route>
              </Switch>
            )}
        </Router>
        {/* {windowWidth < breakpoint && !roomId ? <Sidebar /> : null}
          {windowWidth < breakpoint && roomId ? (
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          ) : (
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/" />
              </Switch>
            )}
        </Router> */}
      </div>
    </div>
  );
}

export default App;
