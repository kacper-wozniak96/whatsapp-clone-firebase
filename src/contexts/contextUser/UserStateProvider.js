/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

export const StateContext = createContext();

export const UserStateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
