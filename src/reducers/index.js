import {
  LOGGING_IN,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  SET_USER_VIEW,
  UPDATE_ACCOUNT,
  ADD_REAL_ESTATE,
  GET_REAL_ESTATE,
  UPDATING_REAL_ESTATE,
  SET_REAL_ESTATE_SORT,
  DELETE_REAL_ESTATE,
  UPDATING_WIDGETS,
  SET_WIDGETS,
  MOCK_DATA_PULL,
  ADD_REAL_ESTATE_FAIL
} from "../actions";
 
const initialState = {
  user: {
    username: "",
    organization: "",
    realEstate: [],
    widgets: []
  },
  userView: "all",
  sortBy: { property: "zestimate", order: "highToLow" },
  loggingIn: false,
  updatingAccount: false,
  udpatingRealEstate: false,
  updatingWidgets: false,
  error: null,
  addRealEstateFail: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOCK_DATA_PULL:
      console.log(action.payload.user);
      return {
        ...state,
        ...action.payload
      };

    // Login reducers
    case LOGGING_IN:
      return { ...state, loggingIn: true };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        loggingIn: false,
        error: null,
        user: { ...action.payload, realEstate: [] }
      };
    case LOGIN_ERROR:
      return { ...state, loggingIn: false, error: action.payload };

    // Set View reducers
    case SET_USER_VIEW:
      console.log(action.payload);
      return {
        ...state,
        userView: action.payload
      };

    // Update Account reducers
    case UPDATE_ACCOUNT:
      return {
        ...state,
        error: null,
        user: {
          ...state.user,
          username: action.payload.email
        }
      };

    // Real Estate reducers
    case GET_REAL_ESTATE:
      return {
        ...state,
        user: {
          ...state.user,
          realEstate: [...state.user.realEstate, ...action.payload]
        }
      };
    case ADD_REAL_ESTATE:
      // If John returns full realEstate Array
      // return {
      //   ...state,
      //   updatingRealEstate: false,
      //   user: { ...state.user, realEstate: action.payload }

      //If John returns single realEstate Object
      return {
        ...state,
        updatingRealEstate: false,
        error: null,
        user: {
          ...state.user,
          realEstate: [...state.user.realEstate, action.payload]
        },
        addRealEstateFail: false
      };

    // If John returns single id
    //return;
      case ADD_REAL_ESTATE_FAIL: 
      return{
        ...state,
        addRealEstateFail: true
      }








    case SET_REAL_ESTATE_SORT:
      return { ...state, sortBy: action.payload };
    case DELETE_REAL_ESTATE:
      // action.payload should be an id of the deleted object
      const getObjectIndex = () => {
        for (let i = 0; i < state.user.realEstate.length; i++) {
          if (state.user.realEstate[i].id === action.payload) {
            return i;
          }
        }
      };
      const index = getObjectIndex();

      if (index) {
        return {
          ...state,
          error: null,
          updatingRealEstate: false,
          user: {
            ...state.user,
            realEstate: {
              ...state.user.realEstate,
              [state.userView]: action.payload
            }
          }
        };
      } else {
        return {
          ...state,
          error: "Cannot delete realEstate object.  ID not found"
        };
      }

    // Widget reducers
    case UPDATING_WIDGETS:
      return { ...state, updatingWidgets: true };
    case SET_WIDGETS:
      return {
        ...state,
        updatingWidgets: false,
        user: { ...state.user, widgets: action.payload }
      };
    default:
      return state;
  }
};
