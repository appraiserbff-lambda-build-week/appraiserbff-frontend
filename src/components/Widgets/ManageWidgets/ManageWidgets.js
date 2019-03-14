import React, { useState, useEffect, Fragment } from "react";
import styles from "./manageWidgets.module.scss";
import { Link } from "react-browser-router";
import widgetData from "../Widget/widgetData.js";
import { setWidgets } from "../../../actions";
import { connect } from "react-redux";

function ManageWidgets(props) {
  // Component mounts with no props from Redux so set to empty array first
  const [localWidgets, setLW] = useState([]);
  // Once props is received from Redux, update state
  useEffect(
    () => {
      // componentDidUpdate
      setLW(props.widgets);
    },
    [props.widgets]
  );

  // Change order of widgets on click;
  const changeOrder = (index, move) => {
    const newOrder = [...localWidgets]; // fight the power
    const holder = newOrder[index];
    newOrder[index] = newOrder[index + move];
    newOrder[index + move] = holder;
    setLW(newOrder);
  };

  // Add/Remove widgets
  const changeWidgets = widget => {
    let widgets = [...localWidgets];
    const index = widgets.indexOf(widget);
    if (index > -1) {
      widgets = [...widgets.slice(0, index), ...widgets.slice(index + 1)];
    } else {
      widgets.push(widget);
    }
    setLW(widgets);
  };

  // Users widgets, in order
  const getUserWidgetList = () => {
    return localWidgets.map((name, index) => {
      const { display } = widgetData[name]();
      let up, down;
      if (index > 0) {
        up = (
          <i
            onClick={() => changeOrder(index, -1)}
            className="fas fa-caret-up"
          />
        );
      } else {
        up = <i className={`fas fa-caret-up ${styles.inactive}`} />;
      }
      if (index < localWidgets.length - 1) {
        down = (
          <i
            onClick={() => changeOrder(index, 1)}
            className="fas fa-caret-down"
          />
        );
      } else {
        down = <i className={`fas fa-caret-down ${styles.inactive}`} />;
      }
      return (
        <div key={name} className={styles.widget}>
          <p>{display}</p>
          <div className={styles.arrows}>
            {up}
            {down}
          </div>
        </div>
      );
    });
  };

  // Get all widgets available
  const getWidgetChecklist = () => {
    return Object.keys(widgetData).map(widget => {
      const { display } = widgetData[widget]();
      let checked = localWidgets.includes(widget) ? true : false;

      return (
        <div key={widget}>
          <input
            type="checkbox"
            onChange={() => changeWidgets(widget)}
            checked={checked}
          />{" "}
          {display}
        </div>
      );
    });
  };

  const saveWidgets = e => {
    e.preventDefault();
    props.setWidgets(localWidgets);
  };

  const sortNames = getUserWidgetList();
  const fullWidgetList = getWidgetChecklist();
  return (
    <Fragment>
      <Link to="/home">
        <div className={styles.manageWidgets} />
      </Link>
      <form className={styles.dialog} onSubmit={e => saveWidgets(e)}>
        <main>
          <section>
            <h2>Your Widgets</h2>
            <div className={styles.sortWidgets}>{sortNames}</div>
          </section>
          <section>
            <h2>Widgets</h2>
            <div className={styles.allWidgets}>{fullWidgetList}</div>
          </section>
          <section>
            <Link to="/home">X</Link>
          </section>
        </main>
        <footer>
          <button className={styles.save} type="submit">
            {props.updatingWidgets ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              "Save Widgets!"
            )}
          </button>
        </footer>
      </form>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  widgets: state.user.widgets,
  updatingWidgets: state.updatingWidgets
});

export default connect(
  mapStateToProps,
  { setWidgets }
)(ManageWidgets);
