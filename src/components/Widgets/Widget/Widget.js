import React, { useState } from "react";
import styles from "./widget.module.scss";
import widgetData from "./widgetData.js";
import { connect } from "react-redux";
import { setSortBy } from "../../../actions";

function Widget(props) {
  const localRealEstate =
    props.userView === "all"
      ? [...props.realEstate.sell, ...props.realEstate.buy]
      : [...props.realEstate[props.userView]];
  const widgetObj = widgetData[props.widget](localRealEstate);

  const updateSort = (property, order) => {
    setSortBy({ property, order });
  };

  return (
    <div className={styles.widget}>
      <div className={styles.info}>
        <h2>{widgetObj.header}</h2>
        <p>{widgetObj.data()}</p>
      </div>
      <div className={styles.sortArrows}>
        <p>
          <i
            onClick={() => updateSort(widgetObj.estateProp, "highToLow")}
            className="fas fa-sort-amount-up"
          />
        </p>
        <p>
          <i
            onClick={() => updateSort(widgetObj.estateProp, "lowToHigh")}
            className={`fas fa-sort-amount-up ${styles.down}`}
          />
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  widgets: state.user.widgets,
  realEstate: state.user.realEstate,
  userView: state.userView
});

export default connect(
  mapStateToProps,
  { setSortBy }
)(Widget);
