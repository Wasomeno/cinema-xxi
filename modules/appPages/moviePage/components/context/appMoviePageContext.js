import { createContext, useContext } from "react";

export const ContextValue = createContext();
export const ContextAction = createContext();

export function useMoviePageValueContext() {
  const contextValues = useContext(ContextValue);
  return contextValues;
}

export function useMoviePageActionContext() {
  const contextActions = useContext(ContextAction);
  return contextActions;
}
