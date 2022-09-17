import React, { useState, useContext, useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { setIsAuth, isAuth, username, setUsername } = useContext(UserContext);

  const [pass, setPass] = useState("123456");
  const [user, setUser] = useState("admin");
  const [error, setError] = useState(false);

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const setErrorTime = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => {
      clearInterval(setErrorTime);
    };
  }, [error]);

  const baseUrl = "http://localhost:3002/api";

  //   mock data

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === username && pass === password) {
      setIsAuth(true);
      console.log(isAuth);
      console.log("ok");
      navigate("clean");
    } else setError(true);
    return;
  };

  //   const getData = async () => {
  //     try {
  //       const response = await axios.post(`${baseUrl}/login`, {
  //         username: username,
  //         password: password,
  //       });
  //       setToken(response.data.token);
  //       setIsAuth(true);

  //       setUsername(username);
  //       console.log(isAuth);
  //       localStorage.setItem("token", JSON.stringify(token));
  //       localStorage.setItem("isAuth", JSON.stringify(isAuth));
  //       navigate("/products");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     getData();
  //   };

  return (
    <section className="section-center">
      <form className="login">
        <label htmlFor="username">username</label>
        <input
          className="login-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label className="login-label" htmlFor="password">
          password
        </label>
        <input
          className="login-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="login-btn" onClick={handleSubmit}>
          login
        </button>
        <p className={error ? "error" : "hidden"}>usuário ou senha inválidos</p>
      </form>
    </section>
  );
};

export default Login;
