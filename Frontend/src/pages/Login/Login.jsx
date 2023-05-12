import React, { useEffect, useState } from "react";
import "./Login.css";
import BakerSVG from "/assets/baker-animate.svg";
import Joi from "joi";
import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

function Login() {
  const { loading, data, handleRequest } = useApi();
  const form = useForm(schema, { username: "", password: "" });
  const [errState, setErrState] = useState(true)

  const postLogin = async (username, password) => {
    const response = await handleRequest("POST", "/login", {
      username,
      password,
    });
    if (response.token) {
      localStorage.setItem("cook", response.token);
      window.location.replace("http://localhost:5173/Home")
    } else {
      console.log("La contraseña o el usuario son incorrectos");
      setErrState(false)
    }
  };

  const handleLogin = () => {
    if (form.validate()) {
      postLogin(form.values.username, form.values.password);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('cook') == null) {
      console.log('Logged Out')
    }else{
      console.log('Logged In')
      window.location.replace("http://localhost:5173/Home")
    }
  }, []);

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

          {!errState ? <span className="errorMsg">Usuario o contraseña incorrecta</span> : <div />}

          <Button
            type="primary"
            onClick={handleLogin}
            disabled={!form.values.username || !form.values.password}
            loading={loading}
          >
            Login
          </Button>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
