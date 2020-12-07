import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useViewport } from './contexts/contextViewport';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { useStateValue } from './contexts/contextUser/UserStateProvider';

function App() {
  const { windowWidth, breakpoint } = useViewport();
  // console.log(windowWidth);
  // console.log(breakpoint);
  // const breakpoint = 620;
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const adjustingVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('load', adjustingVh);

  useEffect(() => {
    window.addEventListener('resize', adjustingVh);
    return () => window.removeEventListener('resize', adjustingVh);
  }, []);

  // prettier-ignore
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
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
          </div>
        )}
    </div>
  );
}

export default App;
