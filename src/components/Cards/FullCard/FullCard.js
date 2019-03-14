
import React from 'react'
import styles from './fullCard.module.scss'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { deleteRealEstate } from "../../../actions";

 
const FullCard = props => {
    return(
        <div>
            <Link to="/home/">
                <div className={styles.cardSettings}>
                </div>

            </Link>

            <div className={styles.cardSettingsModal}>
                <div className={styles.cardSettingsTop}>
                    <Link to="/home/">
                        <i className="fas fa-times" />
                    </Link>
                    <h2>{props.address}</h2>
                    <img src={props.picture} />
                </div>
                <hr />

                <div className={styles.bottom}>
                    <p>bath:      <span>{props.bathrooms}</span></p>
                    <p>bed:       <span>{props.bedrooms}</span></p>
                    <p>built:     <span>{props.built}</span></p>
                    <p>onMarket:  <span>{props.onMarket}</span></p>
                    <p>zestimate: <span>{props.zestimate}</span></p>
                </div>

                <button
                className={styles.deleteButton}
                id={props.id}
                onClick={e => {
                    e.preventDefault();
                    props.deleteRealEstate(props.id);
                }}
                >delete</button>
            </div>
        </div>
    );
};

export default connect(null, {deleteRealEstate})(FullCard)

