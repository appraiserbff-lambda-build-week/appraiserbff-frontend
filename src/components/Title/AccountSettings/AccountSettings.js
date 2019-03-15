import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./accountSettings.module.scss";

import { connect } from 'react-redux';
import { updateAccount } from '../../../actions'


const AccountSettings = props => {
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
        <div className={styles.accountSettings}>  
        </div>
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
          <div style={{ marginBottom: "30px" }}>
            <label style={{ marginRight: "79px" }}>Change Email:</label>
            <input
              type="text"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <label style={{ marginRight: "80px" }}>Old Password:</label>
            <input
              type="text"
              value={oldPass}
              onChange={e => {
                setOldPass(e.target.value);
              }}
            />
          </div>

          <div>
            <label style={{ marginRight: "74px" }}>New Password:</label>
            <input
              type="text"
              value={newPass}
              onChange={e => {
                setNewPass(e.target.value);
              }}
            />
          </div>

          <div>
            <label style={{ marginRight: "50px" }}>Re-type Password:</label>
            <input
              type="text"
              value={rtPass}
              onChange={e => {
                setRtPass(e.target.value);
              }}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
  );
};

const mapStateToProps = state => {
    return{
        user: state.data.user
    }
}


export default connect(mapStateToProps, { updateAccount })(AccountSettings);
