import { createContext } from "react";
import React from "react";
import { useReducer } from "react";

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SET_AUTHORIZED":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload
      };
    case "SET_UNAUTHORIZED":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {

  const store = useReducer(reducer,initialState)
  console.log(store);
  
  return (
    <CurrentUserContext.Provider value={store}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
