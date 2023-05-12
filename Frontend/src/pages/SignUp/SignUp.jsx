import React, { useEffect } from "react";
import "./SignUp.css";
import CookSVG from "/assets/cook-animated.svg";
import Joi from "joi";
import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validación personalizada para la dirección de correo electrónico
    .required(),
});

function SignUp() {
  const { loading, handleRequest } = useApi();
  const form = useForm(schema, { username: "", password: "", email: "" });

  const postSignUp = async (username, password, email) => {
    const response = await handleRequest("POST", "/SignUp", {
      username,
      password,
      email,
    });
    if (response.token) {
      localStorage.setItem("cook", response.token);
      window.location.replace("http://localhost:5173/Home");
    } else {
      console.log("Failed to SignUp");
    }
  };

  const handleSignUp = () => {
    if (form.validate()) {
      postSignUp(form.values.username, form.values.password, form.values.email);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cook") !== null) {
      console.log("Already logged in");
      window.location.replace("http://localhost:5173/Home");
    }
  }, []);

  return (
    <div className="SignUpPage">
      <div className="SignUpContainer">
      <div className="imageContainerSignUp">
          <object className="bakerSVGSignUp" type="image/svg+xml" data={CookSVG}>
            svg-animation
          </object>
        </div>
        <div className="formContainer">
          <h1 className="SignUpTitle">SignUp</h1>
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
            <Input
              value={form.values.email}
              onChange={form.onChange("email")}
              name="email"
              label="Email"
              type="email"
              required
            />
          </div>

          <Button
            type="primary"
            onClick={handleSignUp}
            disabled={!form.values.username || !form.values.password || !form.values.email}
            loading={loading}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
