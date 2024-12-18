import axios from "axios";
import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const value = { backendURL };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
