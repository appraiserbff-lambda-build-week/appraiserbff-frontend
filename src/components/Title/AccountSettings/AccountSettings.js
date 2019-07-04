import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./accountSettings.module.scss";

import { connect } from "react-redux";
import { updateAccount } from "../../../actions";

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

const AccountSettings = props => {
  const classes = useStyles();

  const [email, setEmail] = useState(props.user.username);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rtPass, setRtPass] = useState("");

  const [wrongPass, setWrongPass] = useState(false);
  const [rightPass, setRightPass] = useState(false);

  const submitFormRequest = () => {
    //obviously wel have more conditions in here to make sure everything right but for now this works haha
    if (rtPass === newPass) {
      const newAccountSetting = {
        email: email,
        password: newPass
      };
      setWrongPass(false);
      setRightPass(true);
      props.updateAccount(newAccountSetting);
    } else {
      setWrongPass(true);
      setRightPass(false);
    }

    setEmail("");
    setOldPass("");
    setNewPass("");
    setRtPass("");
  };

  return (
    <div>
      <Link to="/home/">
        <div className={styles.accountSettings} />
      </Link>

      <div className={styles.accountSettingsModal}>
        <div className={styles.accSettingsTop}>
          <h2>Account Settings</h2>
          <Link to="/home/">
            <i className="fas fa-times" />
          </Link>
        </div>
        <hr />

        {wrongPass ? (
          <div style={{ color: "red" }}>
            There was an error processing your request... Either your
            credentials were incorrect or your passswords didn't match.{" "}
          </div>
        ) : null}

        {rightPass ? (
          <div style={{ color: "green" }}>
            Your credentials have been updated!
          </div>
        ) : null}
        <form
          onSubmit={e => {
            e.preventDefault();
            submitFormRequest();
          }}
        >
          <div style={{ marginBottom: "30px", marginTop: "30px" }}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Address</InputLabel>
              <Input
                id="component-simple"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Old Password</InputLabel>
              <Input
                id="component-simple"
                value={oldPass}
                onChange={e => {
                  setOldPass(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">New Password</InputLabel>
              <Input
                id="component-simple"
                value={newPass}
                onChange={e => {
                  setNewPass(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">
                Re-type Password
              </InputLabel>
              <Input
                id="component-simple"
                value={rtPass}
                onChange={e => {
                  setRtPass(e.target.value);
                }}
              />
            </FormControl>
          </div>

          {/* <button type="submit">Submit</button> */}
          <Button type="submit" color="primary" className={classes.button}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.data.user
  };
};

export default connect(
  mapStateToProps,
  { updateAccount }
)(AccountSettings);
