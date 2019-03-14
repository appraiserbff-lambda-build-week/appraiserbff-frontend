import React, { useState, useEffect} from 'react'
import styles from './newCard.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addRealEstate } from '../../../actions';

const NewCard = props => {
            //info for top form
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [thisState, setThisState] = useState("");
    const [zip, setZip] = useState("");
    
            //info for bottom form
    const [sqFootage, setSqFootage] = useState("");
    const [bed, setBed] = useState("");
    const [bath, setBath] = useState("");
    const [lotSize, setLotSize] = useState("");
    const [yearBuilt, setYearBuilt] = useState("");
    const [perSqFt, setPerSqFt] = useState("");
    const [hoa, setHoa] = useState("");
    const [proType, setProType] = useState("");
    const [proAge, setProAge] = useState("");

    const [sliderPos, setSliderPos] = useState(1);

     
    
    const getInfoFromZillow = () => {
        console.log("working");
        
        let splitAddress = address.split(" ").join("+");

        let APIKey = "X1-ZWz18227znjxu3_1acr8";
        //http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<${APIKey}>&address=${splitAddress}&citystatezip=${city}%2C+${thisState}
        let endPoint = `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${APIKey}&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA`
        axios.get(endPoint, {headers: {"zws-id": APIKey}})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const submitForm = () => {
        const newProperty = {
            id: Date.now(),
            address: address,
            city: city,
            state: thisState,
            zipcode: zip,
            bedrooms: bed,
            bathrooms: bath,
            built: yearBuilt,
            picture: "https://i.imgur.com/ufZjaLz.jpg"
          }
        let buySell = "";

        if(sliderPos == 1){
            buySell = "buy"
        }else{
            buySell = "sell"
        }

                        //gunu have to also pass it buySell so it know where to put it
          props.addRealEstate(newProperty, buySell);
    }

    return(
        <div>
            <Link to="/home/">
                <div className={styles.newCard}>
                </div>
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
                        e.preventDefault()
                        getInfoFromZillow();
                    }}
                    >get details</button>
                </form>
                <hr />

                <form className={styles.formTwo}>
                    
                    <div>
                        <label>bed:</label>
                        <input 
                        type="number" 
                        style={{marginLeft: "77px"}}
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
                        style={{marginLeft: "73px"}}
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
                        style={{marginLeft: "34px"}}
                        value={sqFootage}
                        onChange={e => {
                            e.preventDefault();
                            setSqFootage(e.target.value);
                        }}
                        />
                    </div>

                    <div>
                        <label>lot size:</label>
                        <input 
                        type="number" 
                        style={{marginLeft: "55px"}}
                        value={lotSize}
                        onChange={e => {
                            e.preventDefault();
                            setLotSize(e.target.value);
                        }}
                        />
                    </div>

                    <div>
                        <label>year built:</label>
                        <input 
                        type="number" 
                        style={{marginLeft: "40px"}}
                        value={yearBuilt}
                        onChange={e => {
                            e.preventDefault();
                            setYearBuilt(e.target.value);
                        }}
                        />
                    </div>

                    <div>
                        <label>$/sq foot:</label>
                        <input 
                        type="number" 
                        style={{marginLeft: "44px"}}
                        value={perSqFt}
                        onChange={e => {
                            e.preventDefault();
                            setPerSqFt(e.target.value);
                        }}
                        />
                    </div>

                    <div>
                        <label>HOA/month:</label>
                        <input 
                        type="number" 
                        style={{marginLeft: "21px"}}
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
                        type="number" 
                        style={{marginLeft: "12px"}}
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
                        style={{marginLeft: "14px"}}
                        value={proAge}
                        onChange={e => {
                            e.preventDefault();
                            setProAge(e.target.value);
                        }}
                        />
                    </div>


                    <div style={{display: "flex", alignItems: "center"}}>
                        {sliderPos == 1 ? <label style={{fontSize: "26px", color: "red"}}>buy</label> : <label style={{fontSize: "26px", color: "green"}}>sell</label>}
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
                        e.preventDefault()
                        submitForm();
                    }}
                    >Submit Form</button>
                </form>
                <hr />

            </div>  
        </div>
    );
}





export default connect(null, { addRealEstate })(NewCard)