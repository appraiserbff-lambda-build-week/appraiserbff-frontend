// Library Imports
import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { mockDataPull } from "./actions";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
// Styles
import "./globalStyles.scss";
import "./App.scss";
// Component Imports
// Main Components
import TitleBar from "./components/Title/TitleBar";
import CardContainer from "./components/Cards/CardContainer";
import WidgetContainer from "./components/Widgets/WidgetContainer";
import PrivateRoute from "./components/Login/VerifyLogin";

// Widget Imports
import ManageWidgets from "./components/Widgets/ManageWidgets";
// Card Imports
import NewCard from "./components/Cards/NewCard";
import FullCard from "./components/Cards/FullCard";
// Misc Imports
import AccountSettings from "./components/Title/AccountSettings/index";
import Login from "./components/Login/";

class App extends Component {
  componentDidMount() {
    //this.props.mockDataPull();
  }
  render() {
    return (
      <div className="appContainer">
        {localStorage.getItem("token") ? (
          <Redirect to="/home/" />
        ) : (
          <Redirect to="/home/login/" />
        )}
        <Route
          path="/home/login"
          exact
          render={props => <Login {...props} />}
        />
        {/* Home Routes */}
        <header className="titleBar">
          <Route path="/home" render={props => <TitleBar {...props} />} />
        </header>
        <main className="content">
          <Route path="/home" component={WidgetContainer} />
          <Route path="/home" render={props => <CardContainer {...props} />} />
        </main>
        {/* Widget Routes */}
        <Route path="/home/widgets" component={ManageWidgets} />
        {/* Card Routes*/}
        <Route
          path="/home/account_settings"
          exact
          render={props => <AccountSettings {...props} />}
        />
        <Route
          path="/home/card/:id"
          exact
          render={props => (
            <FullCard
              {...props}
              {...this.props.realEstate.find(
                item => item.id === props.match.params.id
              )}
            />
          )}
        />
        <Route
          path="/home/cards/new"
          exact
          render={props => <NewCard {...props} />}
        />
        {/* <PrivateRoute /> redirects to whatever component is passed to it if local storage has an auth toekn, else redirects to login */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    realEstate: state.user.realEstate
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { mockDataPull }
  )(App)
);
