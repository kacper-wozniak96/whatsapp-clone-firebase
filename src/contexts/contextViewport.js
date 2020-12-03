import React, { useEffect, useState, useContext } from 'react';
import throttle from 'lodash.throttle';

const ViewportContext = React.createContext();

export function useViewport() {
  return useContext(ViewportContext);
}

// eslint-disable-next-line react/prop-types
export function ViewportProvider({ children }) {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [windowHeight, setHeight] = useState(window.innerHeight);
  const breakpoint = 620;
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  // const throttleHandleWindowResize = () => {
  //   return throttle(() => {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //   }, 200);
  // };

  useEffect(() => {
    window.addEventListener('resize', throttle(handleWindowResize, 200));
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ windowWidth, windowHeight, breakpoint }}>
      {children}
    </ViewportContext.Provider>
  );
}
