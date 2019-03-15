import React, { useState } from "react";
import styles from "./newCard.module.scss";
import { Link } from "react-router-dom";
//import axios from "axios";
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
  const [yearAssessed, setYearAssessed] = useState("");
  const [taxes, setTaxes] = useState("");
  const [rooms, setRooms] = useState("");

  const getInfoFromZillow = () => {
    // I think it can just be .replace(" ", "+")
    let splitAddress = address.split(" ").join("+");
    let splitCity = city.split(" ").join("+");
    const zillowURL = `&address=${splitAddress}&citystatezip=${splitCity}%2C+${thisState}+${zip}`;
    const url = "../fetchZillow.php";
    const fetchData = {
      method: "POST",
      body: zillowURL,
      cache: "no-cache"
    };

    fetch(url, fetchData)
      .then(res => res.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(xml => {
        const dataTypeToHook = {
          bedrooms: setBed,
          bathrooms: setBath,
          yearBuilt: built => {
            setProAge(new Date().getFullYear() - built);
          },
          finishedSqFt: setSqFt,
          lotSizeSqFt: setLotSize,
          useCode: setProType,
          taxAssessmentYear: setYearAssessed,
          taxAssessment: setTaxes,
          totalRooms: setRooms
        };

        for (let dataType in dataTypeToHook) {
          if (xml.getElementsByTagName(dataType)[0]) {
            dataTypeToHook[dataType](
              xml.getElementsByTagName(dataType)[0].textContent
            );
          }
        }
      });
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
      proType &&
      yearAssessed &&
      taxes
    ) {
      const propertyTypes = [
        "vacant land",
        "townhouse",
        "cando/co-op/duplex",
        "singlefamily"
      ];
      let propNumber = 0;

      propertyTypes.forEach((type, i) => {
        if (type.toLowerCase().includes(proType.toLowerCase())) {
          propNumber = i + 1;
        }
      });
      const mode = sliderPos === 1 ? "buy" : "sell";
      const totalRooms = rooms.length
        ? rooms
        : (Number(bed) + Number(bath)).toString();
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
        mode,
        yearAssessed,
        rooms: totalRooms,
        taxes
      };
      console.log(newProperty);
      //gunu have to also pass it buySell so it know where to put it
      props.addRealEstate(newProperty);
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
            {sliderPos === "1" ? (
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
        {props.addRealEstateFail ? (
          <p style={{ fontSize: "20px", color: "red" }}>Submit failed...</p>
        ) : null}
        {props.addRealEstateSuccess ? (
          <p style={{ fontSize: "20px", color: "green" }}>Submit success!!</p>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    addRealEstateFail: state.data.addRealEstateFail,
    addRealEstateSuccess: state.data.addRealEstateSuccess
  };
};

export default connect(
  mapStateToProps,
  { addRealEstate }
)(NewCard);
