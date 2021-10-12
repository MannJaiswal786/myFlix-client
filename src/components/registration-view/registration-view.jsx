import React, { useState } from "react";
import PropTypes from "prop-types";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [born, setBorn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, born);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
  };

  const handleLogin = (e) => {
    props.onLoginCLick(false);
  };

  return (
    <form>
      <label className="username">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="password">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="email">
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="birthdate">
        Birth date:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBorn(e.target.value)}
        />
      </label>
      <button className="registerBtn" type="submit" onClick={handleSubmit}>
        Register
      </button>
      <button className="loginBtn" type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}

RegistrationView.PropTypes = {
  onLoginClick: PropTypes.func,
  onRegistration: PropTypes.func,
};
