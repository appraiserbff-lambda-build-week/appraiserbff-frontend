import React from "react";
import styles from "./card.module.scss";

const Card = props => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <p className={styles.buysell}>
            {props.mode === "sell" ? (
              <span style={{ color: "green" }}>Selling</span>
            ) : (
              <span style={{ color: "#573143" }}>Buying</span>
            )}
          </p>
          <p className={styles.fact}>{props.item.address}</p>
          <p className={styles.fact}>
            {props.item.city
              .toLowerCase()
              .split(" ")
              .map(word => word[0].toUpperCase() + word.substring(1))
              .join(" ")}
            , {props.item.state} {props.item.zipcode}
          </p>
          <p className={styles.fact}>{props.item.age} years old</p>
          <p className={styles.fact}>{props.item.lotSize} ft lot</p>
          <p className={styles.fact}>
            {props.item.bedrooms} bedroom
            {Number(props.item.bedrooms) === 1 ? "" : "s"} /{" "}
            {props.item.bathrooms} bathroom
            {Number(props.item.bathrooms) === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <hr />
      <div className={styles.bottom}>
        <p>
          Estimate:
          <span>{props.item.zestimate ? `$${props.item.zestimate}` : ""}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
