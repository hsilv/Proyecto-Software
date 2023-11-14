/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import styles from "./404.module.css";

function Page404() {
  
  return <div className={styles.page404}>
    <div className={styles.content404}>
      Vaya! Parece que esta página no existe.
      <NavLink to={'/'} replace>
        Regresar al inicio
      </NavLink>
    </div>
  </div>;
}

export default Page404;
