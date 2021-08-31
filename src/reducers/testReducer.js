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

const format = data => {
  return {
    id: data.id,
    testName: data.test,
    classCode: data.class_code,
    url: data.url,
    endDate: data.end_date,
    dueDate: data.due_date,
    maxMarks: data.max_marks
  };
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TEST:
      return { ...state, [action.payload.id]: format(action.payload) };
    case CREATE_TEST:
      return { ...state, [action.payload.id]: format(action.payload) };
    case SUBMIT_TEST:
      return { ...state, [action.payload.id]: format(action.payload) };
    case EDIT_TEST:
      return { ...state, [action.payload.id]: format(action.payload) };
    case DELETE_TEST:
      return _.omit(state, action.payload);
    case FETCH_TESTS:
      return _.chain(action.payload).mapKeys("id").mapValues(format).value();
    default:
      return state;
  }
};

export default testReducer;
