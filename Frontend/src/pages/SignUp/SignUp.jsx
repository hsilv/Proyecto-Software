import { useContext, useEffect } from "react";
import "./SignUp.css";
import CookSVG from "/assets/recipe-book-animated.svg";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input/Input";
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
          <NavLink className="signReturn" to={'/'}>Already have an account?</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
