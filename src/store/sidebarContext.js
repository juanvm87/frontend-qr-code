import { createContext, useState } from "react";

export const sidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [selected, setSelected] = useState("Home");
  return (
    <sidebarContext.Provider value={{ selected, setSelected }}>
      {children}
    </sidebarContext.Provider>
  );
};
