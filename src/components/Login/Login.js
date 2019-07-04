import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./login.module.scss";
import { logUserIn, createAccount } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  button: {
    textDecoration: "none"
  },
  input: {
    display: "none"
  }
}));

const Login = props => {
  const classes = useStyles();
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
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
            id="component-simple"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Password</InputLabel>
          <Input
            id="component-simple"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>

        {/* <button type="submit">submit</button> */}
        <Button type="submit" color="primary" className={classes.button}>
          Submit
        </Button>
        <p>
          no account? <span onClick={e => toggleView(!view)}>Sign Up</span>
        </p>
      </form>

      <form
        className={styles.createAccForm}
        style={view ? { display: "none" } : { display: "flex" }}
        onSubmit={e => createAccount(e)}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
            id="component-simple"
            type="text"
            value={newUsername}
            onChange={e => {
              setNewUsername(e.target.value);
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Organization</InputLabel>
          <Input
            id="component-simple"
            type="text"
            value={companyName}
            onChange={e => {
              setCompanyName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Password</InputLabel>
          <Input
            id="component-simple"
            type="password"
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
          <Input
            id="component-simple"
            type="password"
            value={retypePass}
            onChange={e => {
              setRTPass(e.target.value);
            }}
          />
        </FormControl>

        <Button type="submit" color="primary" className={classes.button}>
          Submit
        </Button>

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
