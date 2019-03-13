import axios from "axios";

//for mock data pull in CDM
import mockData from "../MockData/sampleData.json";
export const MOCK_DATA_PULL = "MOCK_DATA_PULL";
export const mockDataPull = () => dispatch => {
  console.log(mockData);
  dispatch({ type: MOCK_DATA_PULL, payload: mockData });
};

// Log in actions
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_ERROR = "LOGIN_ERROR";
//new user action
export const CREATE_NEW_ACCOUNT = "CREATE_NEW_ACCOUNT"
// User context actions
export const SET_USER_VIEW = "SET_USER_VIEW";
// Update user account
// Use 2 actions?
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
// Or just 1?
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
// Real Estate actions
export const UPDATING_REAL_ESTATE = "UPDATING_REAL_ESTATE";
export const ADD_REAL_ESTATE = "ADD_REAL_ESTATE";
export const SET_REAL_ESTATE = "SET_REAL_ESTATE";
// Widget actions
export const UPDATING_WIDGETS = "UPDATING_WIDGETS";
export const SET_WIDGETS = "SET_WIDGETS";

export const logUserIn = () => dispatch => {
  dispatch({ type: LOGGING_IN });

  // authentication request
};
export const setUserView = view => {
  // Receive view, update store
  return {
    type: SET_USER_VIEW,
    payload: view
  };
};
// export const updateUsername = username => dispatch => {
//   dispatch({ TYPE: UPDATE_USERNAME });

//   // axios put for username
// };
// export const updatePassword = () => dispatch => {
//   dispatch({ TYPE: UPDATE_PASSWORD });

//   // axios put for password
// };
export const updateAccount = newSettings => dispatch => {
  console.log(newSettings);
  dispatch({ type: UPDATE_ACCOUNT, payload: newSettings });

  // axios put for username/password
};

export const setWidgets = widgets => dispatch => {
  dispatch({ type: UPDATING_WIDGETS });

  axios
    .put("", widgets)
    .then(res => dispatch({ type: SET_WIDGETS, payload: res.data }))
    .catch(err => console.log(err));
};

export const addRealEstate = (realEstate, buyOrSell) => dispatch => {
  dispatch({ type: UPDATING_REAL_ESTATE });
  axios
    .post("", { realEstate, buyOrSell })
    .then(res => dispatch({ type: ADD_REAL_ESTATE, payload: res.data }))
    .catch(err => console.log(err));
};

export const sortRealEstate = realEstateOrder => {
  return {
    type: SET_REAL_ESTATE,
    payload: realEstateOrder
  };
};

export const setRealEstate = realEstate => dispatch => {
  dispatch({ type: UPDATING_REAL_ESTATE });
  axios
    .put("", realEstate)
    .then(res => dispatch({ type: SET_REAL_ESTATE, payload: res.data }))
    .catch(err => console.log(err));
};

export const createAccount = (newAcc, newPassword) => dispatch => {
  console.log(newAcc);
  console.log(newPassword);
  dispatch({type: CREATE_NEW_ACCOUNT})
  axios.post("")
    .then(res => console.log(res))
    .catch(err => console.log(err))
}