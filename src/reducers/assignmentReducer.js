import {
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  SUBMIT_ASSIGNMENT,
  FETCH_ASSIGNMENT,
  FETCH_ASSIGNMENTS
} from "../constants";
import _ from "lodash";
const INITIAL_STATE = {};

const assignmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ASSIGNMENT:
      return { ...state, [action.payload.id]: action.payload };
    case SUBMIT_ASSIGNMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ASSIGNMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ASSIGNMENT:
      return _.omit(state, action.payload);
    case FETCH_ASSIGNMENTS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
};

export default assignmentReducer;
