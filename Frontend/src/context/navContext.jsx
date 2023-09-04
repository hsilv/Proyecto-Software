import { createContext } from "react";
import useNav from "../hooks/useNav";

const NavContext = createContext();

// eslint-disable-next-line react/prop-types
function NavProvider({ children }) {

  const {show, setShow} = useNav();

  return (
    <NavContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export { NavProvider, NavContext };
