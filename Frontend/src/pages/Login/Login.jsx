import { useEffect, useState } from "react";
import "./Login.css";
import BakerSVG from "/assets/baker-animate.svg";
import Joi from "joi";
import { useAPI } from "../../hooks/useAPI";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

function Login() {
  /*   const { checkSession } = useSession(); */
  /*   const { loading, handleRequest } = useApi(); */
  const form = useForm(schema, { username: "", password: "" });
  const [errState, setErrState] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const { result, loading, error, fetchAPI } = useAPI();

  const postLogin = async (username, password) => {
    await fetchAPI({
      method: "POST",
      route: "auth/login",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      log: true,
    });
  };

  const handleLogin = () => {
    if (form.validate()) {
      postLogin(form.values.username, form.values.password);
    }
  };

  useEffect(() => {
    if (result) {
      if (result.status == 203) {
        setErrState(true);
        setErrMessage(result.message);
      } else {
        setErrMessage();
      }
      console.log(result);
    } else if (error) {
      setErrState(true);
      setErrMessage(error.message);
    }
  }, [loading]);

  useEffect(() => {
    /* async function checkLog() {
      if (localStorage.getItem("cook") == null) {
        console.log("Logged Out");
      } else if (await checkSession()) {
        console.log("Logged In");
        window.location.replace("http://localhost:5173/Home");
      } else {
        console.log("Logged Out");
        localStorage.removeItem("cook");
      }
    }
    checkLog(); */
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
