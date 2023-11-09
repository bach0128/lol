import React, { useReducer } from "react";
import { createContext } from "react";
import { rootReducer, initialState } from "./rootReducer";

export const ProviderContext = createContext();
export default function Provider({ children }) {
  // nhận lại state vs dispatch từ Hook,reducer và chuyền xuống component con App -> todoList -> todoform ....

  const [state, dispatch] = useReducer(initialState, rootReducer);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
