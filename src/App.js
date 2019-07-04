// Library Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
// Styles
import "./styles/globalStyles.scss";
import "./App.scss";
// Component Imports
// Main Components
import TitleBar from "./components/Title/TitleBar";
import CardContainer from "./components/Cards/CardContainer";
import WidgetContainer from "./components/Widgets/WidgetContainer";
//import PrivateRoute from "./components/Login/VerifyLogin";

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
    window.addEventListener("beforeunload", localStorage.removeItem("token"));
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      localStorage.removeItem("token")
    );
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="appContainer">
        {localStorage.getItem("token") ? (
          <Redirect to="/home" />
        ) : (
          <Redirect to="/home/login/" />
        )}

        <Route path="/home/login" render={props => <Login {...props} />} />
        {/* Home Routes */}
        <header className="titleBar">
          <Route path="/home" exact render={props => <TitleBar {...props} />} />
          <Route
            path="/home/widgets"
            render={props => <TitleBar {...props} />}
          />
          <Route
            path="/home/account_settings"
            render={props => <TitleBar {...props} />}
          />
          <Route path="/home/cards" render={props => <TitleBar {...props} />} />
          <Route path="/home/card" render={props => <TitleBar {...props} />} />
        </header>
        <main className="content">
          <Route path="/home" exact component={WidgetContainer} />
          <Route
            path="/home"
            exact
            render={props => <CardContainer {...props} />}
          />

          <Route path="/home/widgets" component={WidgetContainer} />
          <Route
            path="/home/widgets"
            render={props => <CardContainer {...props} />}
          />

          <Route path="/home/account_settings" component={WidgetContainer} />
          <Route
            path="/home/account_settings"
            render={props => <CardContainer {...props} />}
          />

          <Route path="/home/card" component={WidgetContainer} />
          <Route
            path="/home/card"
            render={props => <CardContainer {...props} />}
          />

          <Route path="/home/cards" component={WidgetContainer} />
          <Route
            path="/home/cards"
            render={props => <CardContainer {...props} />}
          />
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
          render={props => (
            <FullCard
              {...props}
              {...this.props.realEstate.find(
                item => item.id.toString() === props.match.params.id.toString()
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
    realEstate: state.data.user.realEstate
  };
};

export default withRouter(connect(mapStateToProps)(App));
