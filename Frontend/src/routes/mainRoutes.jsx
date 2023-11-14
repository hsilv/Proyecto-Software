import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../context/sessionContext";
import { LoggedRoutes } from "./loggedRoutes";
import { UnloggedRoutes } from "./unLoggedRoutes";

function MainRoutes() {
  const { userInfo } = useContext(SessionContext);
  const [routes, setRoutes] = useState(() => {
    if (userInfo) {
      return <LoggedRoutes />;
    }else {
      return <UnloggedRoutes />;
    }
  });

  useEffect(() => {
    if (userInfo) {
      setRoutes(<LoggedRoutes />);
    } else {
      setRoutes(<UnloggedRoutes />);
    }
  }, [userInfo]);

  return routes;
}

export { MainRoutes };
