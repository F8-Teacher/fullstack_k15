"use client";

import { createContext } from "react";

export const MainContext = createContext();
export default function MainProvider({ children }) {
  console.log("main provider");

  return (
    <MainContext.Provider value={{ isAuth: true }}>
      {children}
    </MainContext.Provider>
  );
}
