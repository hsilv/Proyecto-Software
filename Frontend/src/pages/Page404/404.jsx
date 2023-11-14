/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import styles from "./404.module.scss";
import { SessionContext } from "../../context/sessionContext";
import { useNavigate } from "react-router-dom";

function Page404() {
  const { logged } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) navigate("/", { replace: true });
  }, []);
  
  return <div className={styles.page404}>404</div>;
}

export default Page404;
