import styles from "./Register.module.css";
import Input from "../../components/Input/Input";
import Joi from "joi";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import registerImage from "/assets/register.jpg";

const schema = Joi.object({
  realName: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
});

function Register() {
  const { signUp, loading, signUpError } = useSignUp();

  const form = useForm(schema, {
    realName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const postSignUp = async (username, password, email, name) => {
    signUp(username, password, email, name);
  };

  const handleSignUp = () => {
    if (form.validate()) {
      // postSignUp(form.values.username, form.values.password, form.values.email, form.values.realName);
      alert("Registration successful! You are now a member.");
    } else {
      alert("Please review and correct the your form answers.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.mainImageContainer}>
        <img src={registerImage} alt="Register Image" />
      </div>
      <div className={styles.formContainer}>
        <h1>Join us!</h1>
        <div className={styles.inputsContainer}>
          <Input
            value={form.values.realName}
            onChange={form.onChange("realName")}
            name="realName"
            label="Full Name"
            type="text"
            required
          />
          <Input
            value={form.values.username}
            onChange={form.onChange("username")}
            name="username"
            label="Username"
            type="text"
            required
          />
          <Input
            value={form.values.email}
            onChange={form.onChange("email")}
            name="email"
            label="Email Address"
            type="email"
            required
          />
          <Input
            value={form.values.password}
            onChange={form.onChange("password")}
            name="password"
            label="Password"
            type="password"
            required
          />
          <Input
            value={form.values.confirmPassword}
            onChange={form.onChange("confirmPassword")}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
        </div>
        <Button
          type="primary"
          onClick={handleSignUp}
          disabled={
            !form.values.username ||
            !form.values.password ||
            !form.values.email ||
            !form.values.confirmPassword
          }
          loading={loading}
        >
          Sign Up
        </Button>
        {signUpError && (
          <span>
            {signUpError.message === "Sesión expirada" ? "" : signUpError.message}
          </span>
        )}
        <p
          style={{ fontFamily: "League Spartan, sans-serif", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <NavLink
            to={"/"}
            style={{
              fontFamily: "League Spartan, sans-serif",
              fontSize: "14px",
            }}
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
