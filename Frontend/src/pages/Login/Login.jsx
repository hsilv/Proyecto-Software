import Joi from "joi";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Login.css";
import BakerSVG from "/assets/baker-animate.svg";
import { useSession } from "../../hooks/useSession";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

function Login() {
  const form = useForm(schema, { username: "", password: "" });
  const [errState, setErrState] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const {login, logged, loading, loginError} = useSession();

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

  useEffect(() => {
    if(logged){
      console.log("Logeado");
      window.location.replace("http://localhost:5173/Home");
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

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="imageContainer">
          <object className="bakerSVG" type="image/svg+xml" data={BakerSVG}>
            svg-animation
          </object>
        </div>
        <div className="formContainer">
          <h1 className="loginTitle">Welcome Back!</h1>
          <div className="inputContainer">
            <Input
              value={form.values.username}
              onChange={form.onChange("username")}
              name="username"
              label="Username"
              type="text"
              required
            />
            <Input
              value={form.values.password}
              onChange={form.onChange("password")}
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
            <a href="http://localhost:5173/SignUp">Register here!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
