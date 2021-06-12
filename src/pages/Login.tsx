import React, { FC, useState } from "react";
import axios from "axios";
import "../assets/styles/login.scss";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const data = { email, password };
    axios
      .post("http://163.47.115.230:30000/api/login", data)
      .then(({ data: { access_token } }) => {
        setLoading(false);
        localStorage.setItem("jwt-token", access_token);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        setMsg("Wrong email password combination");
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <h3>LOGIN</h3>
      <form>
        <input
          id="email"
          name="email"
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <div className="loading-sm" />
        ) : (
          <button
            type="submit"
            onClick={submitForm}
            disabled={email === "" || password == ""}
          >
            Login
          </button>
        )}
      </form>
      {msg !== "" && <p className="error">{msg}</p>}
    </div>
  );
};

export default Login;
