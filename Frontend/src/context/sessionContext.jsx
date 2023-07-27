import { createContext } from "react";
import { useSession } from "../hooks/useSession";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const { login, logOut, logged, loading, loginError, error, checkSession } =
    useSession();

    return (
        <SessionContext.Provider value={{
            login,
            logOut,
            logged,
            loading,
            loginError,
            error,
            checkSession,
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export {SessionProvider, SessionContext};
