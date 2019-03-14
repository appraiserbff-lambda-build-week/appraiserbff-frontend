import React, { useState, useEffect } from "react";
import styles from "./newCard.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addRealEstate } from "../../../actions";

const NewCard = props => {
  //info for top form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [thisState, setThisState] = useState("");
  //info for bottom form
  const [sliderPos, setSliderPos] = useState(1);
  //onst [yearBuilt, setYearBuilt] = useState("");
  //const [perSqFt, setPerSqFt] = useState("");
  // info for backend
  const [zip, setZip] = useState("");
  const [sqFt, setSqFt] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [hoa, setHoa] = useState(0);
  const [proType, setProType] = useState("");
  const [proAge, setProAge] = useState("");

  const getInfoFromZillow = () => {
    // I think it can just be .replace(" ", "+")
    let splitAddress = address.split(" ").join("+");
    let splitCity = city.split(" ").join("+");
    const zillowURL = `&address=${splitAddress}&citystatezip=${splitCity}%2C+${thisState}+${zip}`;
    const url = "../fetchZillow.php";
    console.log(zillowURL);
    const fetchData = {
      method: "POST",
      body: zillowURL,
      cache: "no-cache"
    };

    fetch(url, fetchData)
      .then(res => res.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(xml => {
        console.log(xml);
        const newREObj = {};
        setBed(xml.getElementsByTagName("bedrooms")[0].textContent);
        setBath(xml.getElementsByTagName("bathrooms")[0].textContent);
        setProAge(
          new Date().getFullYear() -
            xml.getElementsByTagName("yearBuilt")[0].textContent
        );
        setSqFt(xml.getElementsByTagName("finishedSqFt")[0].textContent);
        setLotSize(xml.getElementsByTagName("lotSizeSqFt")[0].textContent);
        //const oHOA = xml.getElementsByTagName("lastSoldDate")[0]
        setProType(xml.getElementsByTagName("useCode")[0].textContent);

        console.log(newREObj);
      });
    /*.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(xml => {
        console.log(xml);
        this.setState({ xml });*/

    // axios
    //   .post(url, zillowURL)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  const submitForm = () => {
    if (
      address &&
      city &&
      thisState &&
      zip &&
      bed &&
      bath &&
      proAge &&
      sqFt &&
      lotSize &&
      hoa >= 0 &&
      proType
    ) {
      const propertyTypes = [
        "vacant land",
        "townhouse",
        "cando/co-op/duplex",
        "single family residential"
      ];
      let propNumber = 0;

      propertyTypes.forEach((type, i) => {
        if (type.toLowerCase().includes(proType.toLowerCase())) {
          propNumber = i + 1;
        }
      });
      const mode = sliderPos === 1 ? "buy" : "sell";

      const newProperty = {
        address,
        city,
        state: thisState,
        zipcode: zip,
        bedrooms: bed,
        bathrooms: bath,
        age: proAge,
        picture: "https://i.imgur.com/ufZjaLz.jpg",
        sqFt,
        lotSize,
        hoa,
        type: propNumber,
        onMarket: new Date(),
        mode
      };
      console.log(newProperty);
      //gunu have to also pass it buySell so it know where to put it
      //props.addRealEstate(newProperty, buySell);
    }
  };

  return (
    <div>
      <Link to="/home/">
        <div className={styles.newCard} />
      </Link>

      <div className={styles.newCardModal}>
        <div className={styles.cardSettingsTop}>
          <h2>New Estimate</h2>
          <Link to="/home/">
            <i className="fas fa-times" />
          </Link>
        </div>
        <hr />

        <form className={styles.formOne}>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={e => {
                e.preventDefault();
                setAddress(e.target.value);
              }}
            />
          </div>

          <div>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={e => {
                e.preventDefault();
                setCity(e.target.value);
              }}
            />
          </div>

          <div>
            <label>State:</label>
            <input
              type="text"
              value={thisState}
              onChange={e => {
                e.preventDefault();
                setThisState(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Zip:</label>
            <input
              type="text"
              value={zip}
              onChange={e => {
                e.preventDefault();
                setZip(e.target.value);
              }}
            />
          </div>

          <button
            onClick={e => {
              e.preventDefault();
              getInfoFromZillow();
            }}
          >
            get details
          </button>
        </form>
        <hr />

        <form className={styles.formTwo}>
          <div>
            <label>bed:</label>
            <input
              type="number"
              style={{ marginLeft: "77px" }}
              value={bed}
              onChange={e => {
                e.preventDefault();
                setBed(e.target.value);
              }}
            />
          </div>

          <div>
            <label>bath:</label>
            <input
              type="number"
              style={{ marginLeft: "73px" }}
              value={bath}
              onChange={e => {
                e.preventDefault();
                setBath(e.target.value);
              }}
            />
          </div>

          <div>
            <label>sq footage:</label>
            <input
              type="number"
              style={{ marginLeft: "34px" }}
              value={sqFt}
              onChange={e => {
                e.preventDefault();
                setSqFt(e.target.value);
              }}
            />
          </div>

          <div>
            <label>lot size:</label>
            <input
              type="number"
              style={{ marginLeft: "55px" }}
              value={lotSize}
              onChange={e => {
                e.preventDefault();
                setLotSize(e.target.value);
              }}
            />
          </div>

          <div>
            <label>HOA/month:</label>
            <input
              type="number"
              style={{ marginLeft: "21px" }}
              value={hoa}
              onChange={e => {
                e.preventDefault();
                setHoa(e.target.value);
              }}
            />
          </div>

          <div>
            <label>property type:</label>
            <input
              type="text"
              style={{ marginLeft: "12px" }}
              value={proType}
              onChange={e => {
                e.preventDefault();
                setProType(e.target.value);
              }}
            />
          </div>

          <div>
            <label>property age:</label>
            <input
              type="number"
              style={{ marginLeft: "14px" }}
              value={proAge}
              onChange={e => {
                e.preventDefault();
                setProAge(e.target.value);
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {sliderPos == 1 ? (
              <label style={{ fontSize: "26px", color: "red" }}>buy</label>
            ) : (
              <label style={{ fontSize: "26px", color: "green" }}>sell</label>
            )}
            <input
              type="range"
              min="1"
              max="2"
              value={sliderPos}
              className={styles.slider}
              id="myRange"
              onChange={e => setSliderPos(e.target.value)}
            />
          </div>

          <button
            onClick={e => {
              e.preventDefault();
              submitForm();
            }}
          >
            Submit Form
          </button>
        </form>
        <hr />
      </div>
    </div>
  );
};

export default connect(
  null,
  { addRealEstate }
)(NewCard);

/*
Stuff AJ removed:

<div>
  <label>$/sq foot:</label>
  <input
    type="number"
    style={{ marginLeft: "44px" }}
    value={perSqFt}
    onChange={e => {
      e.preventDefault();
      setPerSqFt(e.target.value);
    }}
  />
</div>

<div>
  <label>year built:</label>
  <input
    type="number"
    style={{ marginLeft: "40px" }}
    value={yearBuilt}
    onChange={e => {
      e.preventDefault();
      setYearBuilt(e.target.value);
    }}
  />
</div>


*/
