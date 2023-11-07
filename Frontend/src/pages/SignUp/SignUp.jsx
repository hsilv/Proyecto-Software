import { useContext, useEffect } from "react";
import styles from "./SignUp.module.css";
import Register from "../../components/Register/Register";


import Joi from "joi";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";
import { useSignUp } from "../../hooks/useSignUp";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

function SignUp() {
  const form = useForm(schema, { username: "", password: "", email: "" });
  const {logged} = useContext(SessionContext);
  const navigate = useNavigate();
  const {signUp, loading} = useSignUp();

  useEffect(() => {
    if(logged){
      navigate('/Home');
    }
  }, [logged, navigate]);

  const postSignUp = async (username, password, email) => {
    signUp(username, password, email);
  }
  
  const handleSignUp = () => {
    if (form.validate()) {
      postSignUp(form.values.username, form.values.password, form.values.email);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Register />
    </div>
  );
}

export default SignUp;
