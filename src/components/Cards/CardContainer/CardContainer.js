import React, { useState, useEffect } from "react";
import styles from "./cardContainer.module.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUserView } from "../../../actions";

const CardContainer = props => {
  const [filteredByStatus, setFBS] = useState(1);

  // sort array in buy, sell, all
  const realEstateSorter = () => {
    const { property } = props.sortBy;
    const { order } = props.sortBy;
    const sorted =
      props.userView === "all"
        ? [...props.realEstate]
        : props.realEstate.filter(estate => estate.mode === props.userView);

    // if (!property || !order) {
    //   return sorted;
    // }

    return sorted.sort((a, b) => {
      if (typeof a[property] === "number") {
        // Sort by number

        //Sort high-to-low or low-to-high based on input
        return order === "lowToHigh"
          ? a[property] - b[property]
          : b[property] - a[property];
      } else if (typeof a[property] === "string") {
        // Sort strings
        const aProp = a[property].toLowerCase();
        const bProp = b[property].toLowerCase();

        if (aProp === bProp) {
          // If they are the same string, do nothing
          return 0;
        } else {
          // Otherwise swap their order, based on input
          const top = order === "highToLow" ? -1 : 1;
          const bottom = order === "highToLow" ? 1 : -1;
          return aProp < bProp ? bottom : top;
        }
      }
      // In case I messed something up and type isn't a string or number,
      // do nothing
    });
  };

  // Real Estate objects based on view
  const [localRealEstate, setLocalRE] = useState(props.realEstate);
  // componentDidUpdate
  useEffect(
    () => {
      const sorted = realEstateSorter();
      setLocalRE(sorted);
    },
    [props.userView, props.realEstate, props.sortBy]
  );
  const [filterBySearch, seFilterBySearch] = useState("");

  return (
    <div className={styles.cardContainerWrapper}>
      <div className={styles.flexTop}>
        <div className={styles.filterResults}>
          <label>filter results:</label>
          <input 
          value={filterBySearch}
          onChange={e => seFilterBySearch(e.target.value)}
          type="text" />
        </div>

        <div>
          <p>
            {filteredByStatus == 1
              ? "all"
              : filteredByStatus == 2
              ? "buy"
              : filteredByStatus == 3
              ? "sell"
              : null}
          </p>

          <input
            type="range"
            min="1"
            max="3"
            value={filteredByStatus}
            className={styles.slider}
            id="myRange"
            onChange={e => {
              setFBS(e.target.value); //returns 1 or 3 tepending on position.... pretty cool, didnt know about this feature
              // setFBS is async so using the current value
              // to trigger the action
              if (e.target.value === "1") {
                props.setUserView("all");
              }
              if (e.target.value === "2") {
                props.setUserView("buy");
              }
              if (e.target.value === "3") {
                props.setUserView("sell");
              }
            }}
          />
        </div>

        <Link to="/home/cards/new">
          <button>New Estimate</button>
        </Link>
      </div>
      <div className={styles.cardContainer}>
        {localRealEstate.filter(item => item.address.toLowerCase().includes(filterBySearch.toLocaleLowerCase())).map(item => (
          <Card mode={item.mode} key={item.id} item={item} />
        ))}

      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    realEstate: state.user.realEstate,
    userView: state.userView,
    sortBy: state.sortBy
  };
};

export default connect(
  mapStateToProps,
  { setUserView }
)(CardContainer);

