import { createContext, useContext } from "react";

export const ContextValue = createContext();
export const ContextAction = createContext();

export function useMoviePageValueContext() {
  return useContext(ContextValue);
}

export function useMoviePageActionContext() {
  return useContext(ContextAction);
}
