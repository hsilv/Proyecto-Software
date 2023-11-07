/* eslint-disable react/prop-types */
import Joi from "joi";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import { useNavigate } from "react-router-dom";
import loginImage from "/assets/login.jpg";

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9|_|-]{3,30}$"))
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

function LoginComponent({ pageCallback }) {
  const form = useForm(schema, { username: "", password: "" });
  const [errState, setErrState] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const { login, logged, loading, loginError, error } = useContext(SessionContext);
  const navigate = useNavigate();

  const postLogin = async (username, password) => {
    await login(username, password);
  };

  const handleLogin = () => {
    if (form.validate()) {
      postLogin(form.values.username, form.values.password);
    } else {
      setErrState(true);
      setErrMessage('Usuario o contraseña no válidos');
    }
  };

  const submitWithKey = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  useEffect(() => {
    if (logged) {
      navigate("/Home");
      setErrState(false);
    }
  }, [logged]);

  useEffect(() => {
    if (loginError) {
      if (loginError.status) {
        setErrState(true);
        setErrMessage(loginError.message);
      }
    }
  }, [loginError])

  useEffect(() => {
    if (error) {
      if (error.status) {
        setErrState(true);
        setErrMessage(error.message);
      }
    }
  }, [error])

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginformContainer}>
        <h1>Welcome Back!</h1>
        <div className={styles.logininputsContainer}>
          <Input
            value={form.values.username}
            onChange={form.onChange("username")}
            onKeyDown={submitWithKey}
            name="username"
            label="Username"
            type="text"
            required
          />
          <Input
            value={form.values.password}
            onChange={form.onChange("password")}
            onKeyDown={submitWithKey}
            name="password"
            label="Password"
            type="password"
            required
          />
          
          {errState ? <span style={{ fontFamily: "League Spartan, sans-serif", fontSize: "14px" }} className={styles.errorMsg}>{errMessage}</span> : null}

          <Button
            type="primary"
            onClick={handleLogin}
            disabled={!form.values.username || !form.values.password}
            loading={loading}
          >
            Login
          </Button>
          <p
            style={{ fontFamily: "League Spartan, sans-serif", fontSize: "14px" }}
          >
            Don&apos;t have an account yet?{" "}
            <button className={styles.linkButton}
              onClick={() => pageCallback(false)}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
      <div className={styles.loginmainImageContainer}>
        <img src={loginImage} alt="Register Image" />
      </div>
    </div>
  );
}

export default LoginComponent;
