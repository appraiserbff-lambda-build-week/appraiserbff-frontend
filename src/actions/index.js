import axios from "axios";
import { push } from "connected-react-router";

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
export const CREATE_NEW_ACCOUNT = "CREATE_NEW_ACCOUNT";
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
export const GET_REAL_ESTATE = "GET_REAL_ESTATE";
export const SET_REAL_ESTATE_SORT = "SET_REAL_ESTATE_SORT";
export const ADD_REAL_ESTATE = "ADD_REAL_ESTATE";
export const DELETE_REAL_ESTATE = "DELETE_REAL_ESTATE";
export const ADD_REAL_ESTATE_FAIL = "ADD_REAL_ESTATE_FAIL";
// Widget actions
export const UPDATING_WIDGETS = "UPDATING_WIDGETS";
export const SET_WIDGETS = "SET_WIDGETS";
export const REDIRECT_HOME = "REDIRECT_HOME";
export const ROUTE_COMPLETE = "ROUTE_COMPLETE";

const url = "https://ajbrush.com/home-api";

export const getRealEstate = () => dispatch => {
  const token = localStorage.getItem("token");
  axios
    .post(`${url}/properties`, { token })
    .then(res => dispatch({ type: GET_REAL_ESTATE, payload: res.data }))
    .catch(err => console.log(err));
};

export const logUserIn = ({ username, password }) => dispatch => {
  console.log("Attempting Login");
  dispatch({ type: LOGGING_IN });

  axios
    .post(`${url}/login`, { username, password })
    .then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      console.log("1", res.data.token);
      dispatch({ type: LOGIN_SUCCESSFUL, payload: res.data.user });
      dispatch(getRealEstate());
    })
    .catch(err => console.log(err));
};

export const createAccount = (
  { username, organization },
  password
) => dispatch => {
  dispatch({ type: CREATE_NEW_ACCOUNT });
  axios
    .post(`${url}/register`, { username, password, organization })
    .then(res => dispatch(logUserIn({ username, password })))
    .catch(err => console.log(err));
};

export const updateAccount = newSettings => dispatch => {
  console.log(newSettings);
  dispatch({ type: UPDATE_ACCOUNT, payload: newSettings });
  dispatch(push("/home"));

  // axios put for username/password
};

export const setUserView = view => {
  // Receive view, update store
  return {
    type: SET_USER_VIEW,
    payload: view
  };
};

export const setWidgets = widgets => dispatch => {
  dispatch({ type: UPDATING_WIDGETS });
  const token = localStorage.getItem("token");
  axios
    .post(`${url}/user/update-widgets`, { widgets, token })
    .then(res => {
      dispatch({ type: SET_WIDGETS, payload: widgets });
      dispatch(push("/home"));
    })
    .catch(err => console.log(err));
};

export const addRealEstate = realEstate => dispatch => {
  dispatch({ type: UPDATING_REAL_ESTATE });
  const token = localStorage.getItem("token");
  axios
    .post(`${url}/properties/add`, { ...realEstate, token })
    .then(res => {
      dispatch({
        type: ADD_REAL_ESTATE,
        payload: { ...realEstate, id: res.data }
      });
      dispatch(getRealEstate());
      dispatch(push("/home"));
    })
    .catch(err => dispatch({ type: ADD_REAL_ESTATE_FAIL }));
};

export const setSortBy = sortObj => {
  return {
    type: SET_REAL_ESTATE_SORT,
    payload: sortObj
  };
};

export const deleteRealEstate = id => dispatch => {
  dispatch({ type: UPDATING_REAL_ESTATE });
  const token = localStorage.getItem("token");
  axios
    .post(`${url}/properties/delete`, { id, token })
    .then(res => dispatch({ type: DELETE_REAL_ESTATE, payload: id }))
    .catch(err => console.log(err));
};
