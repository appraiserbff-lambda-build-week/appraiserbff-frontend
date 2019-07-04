import React from "react";
import styles from "./widgetContainer.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Widget from "../Widget";

function WidgetContainer(props) {
  const usersWidgets = props.widgets.map((key, i) => {
    return <Widget key={key} widget={key} />;
  });
  return (
    <div className={styles.widgetContainer}>
      <div className={styles.widgetTitle}>
        <h2>Overview</h2>
        <Link to="/home/widgets">
          <i className="fas fa-cogs" />
        </Link>
      </div>
      {usersWidgets}
    </div>
  );
}

const mapStateToProps = state => ({
  widgets: state.data.user.widgets
});

export default connect(
  mapStateToProps,
  {}
)(WidgetContainer);
