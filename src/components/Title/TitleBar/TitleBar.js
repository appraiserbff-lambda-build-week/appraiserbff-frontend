import React from "react";
import styles from "./titleBar.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const TitleBar = props => {
  return (
    <div>
      <div className={styles.titleBar}>
        <h2>{props.organization}</h2>
        <div className={styles.user}>
          <Link to="/home/account_settings">
            <i className="fas fa-caret-down" />
          </Link>

          <h3>{props.email}</h3>
          <div className="user-img" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    email: state.data.user.username,
    organization: state.data.user.organization
  };
};

export default connect(
  mapStateToProps,
  {}
)(TitleBar);
