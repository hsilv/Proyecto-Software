import { useState } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";
import LoginComponent from "../../components/Login/Login";

function SignUp() {
  const [currentPage, setCurrentPage] = useState(true);


  return (
    <div className={styles.mainContainer}>
      <div className={currentPage ? styles.fade_in : styles.fade_out}>
        {currentPage ? <LoginComponent pageCallback={setCurrentPage} /> : null}
      </div>
      <div className={!currentPage ? styles.fade_in : styles.fade_out}>
        {!currentPage ? <Register pageCallback={setCurrentPage} /> : null}
      </div>
    </div>
  );
}

export default SignUp;
