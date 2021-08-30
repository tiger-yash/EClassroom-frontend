import {
  FETCH_TEST,
  FETCH_TESTS,
  SUBMIT_TEST,
  CREATE_TEST,
  DELETE_TEST,
  EDIT_TEST
} from "../constants";
import _ from "lodash";
const INITIAL_STATE = {};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TEST:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TEST:
      return { ...state, [action.payload.id]: action.payload };
    case SUBMIT_TEST:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TEST:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TEST:
      return _.omit(state, action.payload);
    case FETCH_TESTS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
};

export default testReducer;
