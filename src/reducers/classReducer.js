import {
  CREATE_CLASS,
  FETCH_CLASS,
  FETCH_CLASSES,
  DELETE_CLASS,
  LEAVE_CLASS,
  JOIN_CLASS
} from "../constants";
import _ from "lodash";
const INITIAL_STATE = {};

const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      return { ...state, [action.payload.id]: action.payload };
    case JOIN_CLASS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_CLASS:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CLASS:
      return _.omit(state, action.payload);
    case LEAVE_CLASS:
      return _.omit(state, action.payload);
    case FETCH_CLASSES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};

export default classReducer;
