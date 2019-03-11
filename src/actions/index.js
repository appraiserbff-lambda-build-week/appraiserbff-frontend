import axios from "axios";

// Log in actions
export const LOGGING_IN = "LOGGING_IN";
// User context actions
export const SET_USER_VIEW = "SET_USER_VIEW";
// Update user account
// Use 2 actions?
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
// Or just 1?
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
// Real Estate actions
export const SORT_REAL_ESTATE = "SORT_REAL_ESTATE";
export const UPDATE_REAL_ESTATE = "UPDATE_REAL_ESTATE";
export const ADD_REAL_ESTATE = "ADD_REAL_ESTATE";
export const DELETE_REAL_ESTATE = "DELETE_REAL_ESTATE";
// Widget actions
export const UPDATE_WIDGETS = "UPDATE_WIDGETS";

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
export const updateUsername = username => dispatch => {
  dispatch({ TYPE: UPDATE_USERNAME });

  // axios put for username
};
export const updatePassword = () => dispatch => {
  dispatch({ TYPE: UPDATE_PASSWORD });

  // axios put for password
};
export const updateAccount = () => dispatch => {
  dispatch({ TYPE: UPDATE_ACCOUNT });

  // axios put for username/password
};
export const sortRealEstate = (category, order) => {
  return {
    type: SORT_REAL_ESTATE,
    payload: { category, order }
  };
};
export const updateWidget = newWidgetList => dispatch => {
  dispatch({ type: ADD_WIDGET });

  // axios put request to OVERRIDE previous widget data
};
export const addRealEstate = realEstate => dispatch => {
  dispatch({ type: ADD_REAL_ESTATE });

  // axios post request
};
export const deleteRealEstate = id => dispatch => {
  dispatch({ type: DELETE_REAL_ESTATE });

  // axios delete request
};
export const updateRealEstate = realEstate => dispatch => {
  dispatch({ type: UPDATE_REAL_ESTATE });

  // axios put request
};
