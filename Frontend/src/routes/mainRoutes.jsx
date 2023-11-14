import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../context/sessionContext";
import { LoggedRoutes } from "./loggedRoutes";
import { UnloggedRoutes } from "./unLoggedRoutes";

function MainRoutes() {
  const { logged } = useContext(SessionContext);
  const [loggedState, setLoggedState] = useState(false);

  useEffect(() => {
    setLoggedState(logged);
  }, [logged]);
  return loggedState ? <LoggedRoutes /> : <UnloggedRoutes />;
}

export { MainRoutes };
