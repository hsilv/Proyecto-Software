import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Login.css";
import BakerSVG from "/assets/baker-animate.svg";
import { SessionContext } from "../../context/sessionContext";
import { NavLink, useNavigate } from "react-router-dom";

const schema = Joi.object({
  username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9|_|-]{3,30}$")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

function Login() {
  const form = useForm(schema, { username: "", password: "" });
  const [errState, setErrState] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const {login, logged, loading, loginError, error} = useContext(SessionContext);
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

  const subtmitWithKey = (e) => {
    if(e.key === "Enter"){
      handleLogin();
    }
  }

  useEffect(() => {
    if(logged){
      navigate("/Home");
      setErrState(false);
    }
  }, [logged]);

  useEffect(() => {
    if(loginError){
      if(loginError.status){
        setErrState(true);
        setErrMessage(loginError.message);
      }
    }
  }, [loginError])

  useEffect(() => {
    if(error){
      if(error.status){
        setErrState(true);
        setErrMessage(error.message);
      }
    }
  }, [error])

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="imageContainer">
          <object className="bakerSVG" type="image/svg+xml" data={BakerSVG}>
            svg-animation
          </object>
        </div>
        <div className="formContainer">
          <h1 className="loginTitle">Bienvenido!</h1>
          <div className="inputContainer">
            <Input
              value={form.values.username}
              onChange={form.onChange("username")}
              onKeyDown={subtmitWithKey}
              name="username"
              label="Username"
              type="text"
              required
            />
            <Input
              value={form.values.password}
              onChange={form.onChange("password")}
              onKeyDown={subtmitWithKey}
              name="password"
              placeholder=""
              label="Password"
              type="password"
              required
            />
          </div>

          {errState ? <span className="errorMsg">{errMessage}</span> : <div />}

          <Button
            type="primary"
            onClick={handleLogin}
            disabled={!form.values.username || !form.values.password}
            loading={loading}
          >
            Login
          </Button>

          <p>
            Don t have an account yet?{" "}
            <NavLink to="/SignUp">Register here!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
