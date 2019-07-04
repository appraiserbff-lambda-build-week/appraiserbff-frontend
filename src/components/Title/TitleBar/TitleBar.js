import React from "react";
import styles from "./titleBar.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const TitleBar = props => {
  const classes = useStyles();

  return (
    // <div>
    //   <div className={styles.titleBar}>
    //     <h2>{props.organization}</h2>
    //     <div className={styles.user}>
    //       <Link to="/home/account_settings">
    //         <i className="fas fa-caret-down" />
    //       </Link>

    //       <h3>{props.email}</h3>
    //       <div className="user-img" />
    //     </div>
    //   </div>
    // </div>

    // <Link
    //           to="/home/account_settings"
    //           style={{ textDecoration: "none", color: "white" }}
    //         ></Link>
    <div className={classes.root}>
      <AppBar flat position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={e => {
              props.history.push("/home/account_settings");
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.organization}
          </Typography>

          <Link
            to="/home/account_settings"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">
              <Typography variant="p" className={classes.title}>
                {props.email}
              </Typography>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
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
