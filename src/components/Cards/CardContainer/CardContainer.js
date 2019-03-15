import React, { useState, useEffect } from "react";
import styles from "./cardContainer.module.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUserView } from "../../../actions";

const CardContainer = props => {
  const [filteredByStatus, setFBS] = useState("1");

  // sort array in buy, sell, all
  const realEstateSorter = () => {
    const { property } = props.sortBy;
    const { order } = props.sortBy;
    const sorted =
      props.userView === "all"
        ? [...props.realEstate]
        : props.realEstate.filter(estate => estate.mode === props.userView);

    if (!property || !order || !sorted.length) {
      return sorted;
    }

    return sorted.sort((a, b) => {
      if (!a[property] || !b[property]) {
        // Sometimes cards dont' get zestimates due to a bug in our
        // card creating process.  This prevents it
        console.log(`No ${property} to sort`);
        return 0;
      }
      // I don't know if the data is going to be a "number" or number.
      // So I convert to a string first just to get a baseline
      const aStr = a[property].toString();
      if (Number(aStr).toString() === aStr) {
        // Sort by number
        const aProp = Number(a[property]);
        const bProps = Number(b[property]);
        //Sort high-to-low or low-to-high based on input
        return order === "lowToHigh" ? aProp - bProps : bProps - aProp;
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
      console.log("No sort for: ", a[property], b[property]);
      return 0;
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
  const userView = props.userView ? (
    <p style={{ textAlign: "center", width: "150px" }}>
      {props.userView[0].toUpperCase() + props.userView.substring(1)}
    </p>
  ) : (
    ""
  );
  return (
    <div className={styles.cardContainerWrapper}>
      <div className={styles.flexTop}>
        <div className={styles.filterResults}>
          <label>Address Search:</label>
          <input
            value={filterBySearch}
            onChange={e => seFilterBySearch(e.target.value)}
            type="text"
          />
        </div>

        <div className={styles.sliderDIV}>
          {userView}
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
        {localRealEstate.length === 0 && props.username ? (
          <p className={styles.noCards}>Click New Estimates to get started!</p>
        ) : (
          localRealEstate
            .filter(item =>
              item.address
                .toLowerCase()
                .includes(filterBySearch.toLocaleLowerCase())
            )
            .map(item => <Card mode={item.mode} key={item.id} item={item} />)
        )}

        {!props.username ? (
          <p className={styles.noCards}>Fetching your properties...</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    realEstate: state.data.user.realEstate,
    username: state.data.user.username,
    userView: state.data.userView,
    sortBy: state.data.sortBy
  };
};

export default connect(
  mapStateToProps,
  { setUserView }
)(CardContainer);
