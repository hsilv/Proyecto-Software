import { useContext, useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";
import LoginComponent from "../../components/Login/Login";

function SignUp() {
  const { logged } = useContext(SessionContext);
  const [currentPage, setCurrentPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate('/Home');
    }
  }, [logged, navigate]);

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
