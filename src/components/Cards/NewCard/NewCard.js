import React, { useState } from "react";
import styles from "./newCard.module.scss";
import { Link } from "react-router-dom";
//import axios from "axios";
import { connect } from "react-redux";
import { addRealEstate } from "../../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  button: {
    textDecoration: "none"
  },
  input: {
    display: "none"
  }
}));

const NewCard = props => {
  const classes = useStyles();
  /*
  This code really should be using a useReducer hook but we didn't know it at the time of writing.
  I don't see the point in refactoring now so just leaving it as is, with its overly complex state.
  */
  //info for top form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [thisState, setThisState] = useState("");
  //info for bottom form
  const [sliderPos, setSliderPos] = useState(2);

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
  const [zestimate, setZestimate] = useState("");

  const getInfoFromZillow = () => {
    // I think it can just be .replace(" ", "+")
    let splitAddress = address.split(" ").join("+");
    let splitCity = city.split(" ").join("+");
    const zillowURL = `&address=${splitAddress}&citystatezip=${splitCity}%2C+${thisState}+${zip}`;
    console.log(zillowURL);
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
          totalRooms: setRooms,
          amount: setZestimate
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
      Number(bed) > 0 &&
      Number(bed) < 10 &&
      Number(bath) > 0 &&
      Number(bath) < 10 &&
      Number(proAge) > 0 &&
      Number(sqFt) > 0 &&
      Number(lotSize) > 0 &&
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
      const buySellConversion = { 1: "buy", 2: "sell" };
      let propNumber = 0;

      propertyTypes.forEach((type, i) => {
        if (type.toLowerCase().includes(proType.toLowerCase())) {
          propNumber = i + 1;
        }
      });
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
        picture: "null",
        sqFt,
        lotSize,
        hoa,
        type: propNumber,
        onMarket: new Date(),
        mode: buySellConversion[sliderPos],
        yearAssessed,
        rooms: totalRooms,
        taxes,
        zestimate
      };
      //console.log(newProperty);
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Address</InputLabel>
              <Input
                id="component-simple"
                value={address}
                onChange={e => {
                  setAddress(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">City</InputLabel>
              <Input
                id="component-simple"
                value={city}
                onChange={e => {
                  e.preventDefault();
                  setCity(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">State</InputLabel>
              <Input
                id="component-simple"
                value={thisState}
                onChange={e => {
                  e.preventDefault();
                  setThisState(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Zip</InputLabel>
              <Input
                id="component-simple"
                value={zip}
                onChange={e => {
                  e.preventDefault();
                  setZip(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <Button
            onClick={e => {
              e.preventDefault();
              getInfoFromZillow();
            }}
            type="submit"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr />

        <form className={styles.formTwo}>
          <div>
            {/* <label>bed:</label>
            <input
              type="number"
              style={{ marginLeft: "87px" }}
              value={bed}
              onChange={e => {
                e.preventDefault();
                setBed(e.target.value);
              }}
              min="0"
              max="9"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Bed Count</InputLabel>
              <Input
                id="component-simple"
                value={bed}
                onChange={e => {
                  e.preventDefault();
                  setBed(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>bath:</label>
            <input
              type="number"
              style={{ marginLeft: "82px" }}
              value={bath}
              onChange={e => {
                e.preventDefault();
                setBath(e.target.value);
              }}
              min="0"
              max="9"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Bath Count</InputLabel>
              <Input
                id="component-simple"
                value={bath}
                onChange={e => {
                  e.preventDefault();
                  setBath(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>sq footage:</label>
            <input
              type="number"
              style={{ marginLeft: "38px" }}
              value={sqFt}
              onChange={e => {
                e.preventDefault();
                setSqFt(e.target.value);
              }}
              min="0"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Sq. Footage</InputLabel>
              <Input
                id="component-simple"
                value={sqFt}
                onChange={e => {
                  e.preventDefault();
                  setSqFt(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>lot size:</label>
            <input
              type="number"
              style={{ marginLeft: "66px" }}
              value={lotSize}
              onChange={e => {
                e.preventDefault();
                setLotSize(e.target.value);
              }}
              min="0"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Lot Size</InputLabel>
              <Input
                id="component-simple"
                value={lotSize}
                onChange={e => {
                  e.preventDefault();
                  setLotSize(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>HOA/month:</label>
            <input
              type="number"
              style={{ marginLeft: "30px" }}
              value={hoa}
              onChange={e => {
                e.preventDefault();
                setHoa(e.target.value);
              }}
              min="0"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">HOA/Month</InputLabel>
              <Input
                id="component-simple"
                value={hoa}
                onChange={e => {
                  e.preventDefault();
                  setHoa(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>property age:</label>
            <input
              type="number"
              style={{ marginLeft: "23px" }}
              value={proAge}
              onChange={e => {
                e.preventDefault();
                setProAge(e.target.value);
              }}
              min="0"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Property Age</InputLabel>
              <Input
                id="component-simple"
                value={proAge}
                onChange={e => {
                  e.preventDefault();
                  setProAge(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>year assessed:</label>
            <input
              type="number"
              style={{ marginLeft: "14px" }}
              value={yearAssessed}
              onChange={e => {
                e.preventDefault();
                setYearAssessed(e.target.value);
              }}
              min="1000"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Year Assessed</InputLabel>
              <Input
                id="component-simple"
                value={yearAssessed}
                onChange={e => {
                  e.preventDefault();
                  setYearAssessed(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>taxes:</label>
            <input
              type="number"
              style={{ marginLeft: "80px" }}
              value={taxes}
              onChange={e => {
                e.preventDefault();
                setTaxes(e.target.value);
              }}
              min="0"
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Taxes</InputLabel>
              <Input
                id="component-simple"
                value={taxes}
                onChange={e => {
                  e.preventDefault();
                  setTaxes(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div>
            {/* <label>rooms:</label>
            <input
              type="number"
              style={{ marginLeft: "74px" }}
              value={rooms}
              onChange={e => {
                e.preventDefault();
                setRooms(e.target.value);
              }}
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Num of Rooms</InputLabel>
              <Input
                id="component-simple"
                onChange={e => {
                  e.preventDefault();
                  setRooms(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", margin: "16px 0" }}
          >
            {sliderPos === "1" ? (
              <label style={{ fontSize: "18px", color: "red" }}>buy</label>
            ) : (
              <label style={{ fontSize: "18px", color: "green" }}>sell</label>
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

          {/* <button
            onClick={e => {
              e.preventDefault();
              submitForm();
            }}
          >
            Submit Form
          </button> */}
          <Button
            onClick={e => {
              e.preventDefault();
              submitForm();
            }}
            type="submit"
            color="primary"
            className={classes.button}
          >
            Submit Form
          </Button>
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
