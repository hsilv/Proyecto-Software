import { useContext, useEffect } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";

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
      <Register />
    </div>
  );
}

export default SignUp;
