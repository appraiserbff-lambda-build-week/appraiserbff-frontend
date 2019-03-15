import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./login.module.scss";
import { logUserIn, createAccount } from "../../actions";

const Login = props => {
  const [loginFailed, setLoginFailed] = useState(false);

  //log in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, toggleView] = useState(true);

  //create account

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [retypePass, setRTPass] = useState("");

  const createAccount = e => {
    e.preventDefault();
    const newAccount = {
      username: newUsername,
      organization: companyName
    };

    if (newPassword === retypePass) {
      props.createAccount(newAccount, newPassword);
    }
  };

  return (
    <div className={styles.fullPage}>
      <form
        className={styles.loginForm}
        style={view ? null : { display: "none" }}
        onSubmit={e => {
          e.preventDefault();
          const credentials = {
            username: username,
            password: password
          };
          props.logUserIn(credentials);
        }}
      >
        {props.loginError ? (
          <p style={{ fontSize: "20px", color: "red" }}>Login failed...</p>
        ) : null}
        <label>Email</label>

        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">submit</button>
        <p>
          no account? <span onClick={e => toggleView(!view)}>make one!</span>
        </p>
      </form>

      <form
        className={styles.createAccForm}
        style={view ? { display: "none" } : { display: "flex" }}
        onSubmit={e => createAccount(e)}
      >
        <label>Email</label>
        <input
          type="text"
          value={newUsername}
          onChange={e => {
            setNewUsername(e.target.value);
          }}
        />

        <label>Organization</label>
        <input
          type="text"
          value={companyName}
          onChange={e => {
            setCompanyName(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
          }}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={retypePass}
          onChange={e => {
            setRTPass(e.target.value);
          }}
        />

        <button type="submit">create account</button>

        <p>
          <span onClick={e => toggleView(!view)}>back to login...</span>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loginError: state.data.error
});

export default connect(
  mapStateToProps,
  { logUserIn, createAccount }
)(Login);
