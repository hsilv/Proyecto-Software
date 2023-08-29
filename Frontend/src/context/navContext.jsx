import { createContext } from "react";

const SessionContext = createContext();

// eslint-disable-next-line react/prop-types
function NavProvider({ children }) {

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
