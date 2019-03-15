import React from "react";
import styles from "./widget.module.scss";
import widgetData from "./widgetData.js";
import { connect } from "react-redux";
import { setSortBy } from "../../../actions";

function Widget(props) {
  const localRealEstate =
    props.userView === "all"
      ? [...props.realEstate]
      : props.realEstate.filter(estate => estate.mode === props.userView);
  const widgetObj = widgetData[props.widget](localRealEstate);

  const updateSort = (property, order) => {
    props.setSortBy({ property, order });
  };

  return (
    <div className={styles.widget}>
      <div className={styles.info}>
        <h2>{widgetObj.header}</h2>
        <p>
          {widgetObj.data() || !isNaN(widgetObj.data()) ? widgetObj.data() : ""}
        </p>
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
  widgets: state.data.user.widgets,
  realEstate: state.data.user.realEstate,
  userView: state.data.userView
});

export default connect(
  mapStateToProps,
  { setSortBy }
)(Widget);
