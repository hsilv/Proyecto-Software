/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import styles from "./404.module.css";

function Page404() {
  
  return <div className={styles.page404}>
    <div className={styles.content404}>
      Oops! It looks this page doesn&apos;t exist
      <NavLink to={'/'} replace>
        Go Back
      </NavLink>
    </div>
  </div>;
}

export default Page404;
