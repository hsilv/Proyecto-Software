import { useContext, useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";
import LoginComponent from "../../components/Login/Login";

function SignUp() {
  const {logged} = useContext(SessionContext);
  const [currentPage, setCurrentPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(logged){
      navigate('/Home');
    }
  }, [logged, navigate]);

  return (
    <div className={styles.mainContainer}>
      {currentPage ? <LoginComponent pageCallback={setCurrentPage}/> : <Register pageCallback={setCurrentPage}/>}
    </div>
  );
}

export default SignUp;
