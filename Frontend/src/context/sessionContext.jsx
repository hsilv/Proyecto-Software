import { createContext } from "react";
import { useSession } from "../hooks/useSession";

const SessionContext = createContext();

// eslint-disable-next-line react/prop-types
function SessionProvider({ children }) {
  const { login, logOut, logged, loading, loginError, error, checkSession, userInfo } =
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
            userInfo,
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export {SessionProvider, SessionContext};
