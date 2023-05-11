import { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState(["", ""]);
  const [buttonState, setButtonState] = useState([false, "disabled"]);

  const validateInput = (credentials) => {
    let testMail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(credentials[0])
      ? true
      : false;
    if (testMail && credentials[1].length > 0) {
      console.log(true);
      setButtonState([true, "enabled"]);
    } else {
      console.log(false);
      setButtonState([false, "disabled"]);
    }
  };

  useEffect(() => validateInput(credentials), [credentials]);

  const handleClick = () => {
    const data = {
      username: "SILVA",
      password: "silva",
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.token))
      .catch((error) => console.log(error));
    console.log("send");
  };

  return (
    <div className="formContainer">
      <img className="logo" src="./src/assets/Vector.png"></img>
      <h1>Log In</h1>
      <input
        type="email"
        id="emailInput"
        placeholder="Correo"
        onChange={(email) =>
          setCredentials([email.target.value, credentials[1]])
        }
      ></input>
      <input
        type="password"
        id="pwInput"
        placeholder="Contraseña"
        onChange={(pw) => setCredentials([credentials[0], pw.target.value])}
      ></input>
      <button
        disabled={!buttonState[0]}
        type="button"
        className={buttonState[1]}
        onClick={handleClick}
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
