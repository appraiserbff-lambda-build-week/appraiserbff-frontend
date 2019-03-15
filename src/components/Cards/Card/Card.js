import React from "react";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";

const Card = props => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <p
            style={{
              textAlign: "left",
              fontSize: "14px",
              textDecoration: "underline"
            }}
          >
            address
          </p>
          <p style={{ fontSize: "16px", padding: "2px" }}>
            {props.item.address}
          </p>
        </div>
        <img src={props.item.picture} alt="Property" />
      </div>
      <hr />
      <div className={styles.bottom}>
        <p>
          estimate:
          <span>{props.item.zestimate ? `$${props.item.zestimate}` : ""}</span>
        </p>
        <p>
          certainty:
          <span>
            {props.item.certainty ? `$${Math.round(props.item.certainty)}` : ""}
          </span>
        </p>
      </div>
      <hr />
      <div className={styles.seeMore}>
        <Link to={`/home/card/${props.item.id}`} style={{ color: "blue" }}>
          see more details
        </Link>
        <p>
          {props.mode === "sell" ? (
            <span style={{ color: "green" }}>sell</span>
          ) : (
            <span style={{ color: "#573143" }}>buy</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
