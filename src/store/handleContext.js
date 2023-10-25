import { createContext, useState } from "react";

export const MyHandleContext = createContext();

export const ContextProvider = ({ children }) => {
  const [selected, setSelected] = useState("Home");
  const [resetInfo, setResetInfo] = useState(true);
  const [accessQr, setAccessQr] = useState({ userId: "", qrId: "" });

  return (
    <MyHandleContext.Provider
      value={{
        selected,
        setSelected,
        accessQr,
        setAccessQr,
        resetInfo,
        setResetInfo,
      }}
    >
      {children}
    </MyHandleContext.Provider>
  );
};
