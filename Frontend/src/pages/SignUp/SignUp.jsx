import { useContext, useEffect } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";
import LoginComponent from "../../components/LogIn/LogIn";

function SignUp() {
  const {logged} = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(logged){
      navigate('/Home');
    }
  }, [logged, navigate]);

  return (
    <div className={styles.mainContainer}>
      {/* <Register /> */}
      <LoginComponent />
      {/* <LoginComponent /> */}
    </div>
  );
}

export default SignUp;
