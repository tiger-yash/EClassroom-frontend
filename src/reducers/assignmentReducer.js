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

const assignmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT:
      return { ...state, [action.payload.id]: format(action.payload) };
    case CREATE_ASSIGNMENT:
      return { ...state, [action.payload.id]: format(action.payload) };
    case SUBMIT_ASSIGNMENT:
      return { ...state, [action.payload.id]: format(action.payload) };
    case EDIT_ASSIGNMENT:
      return { ...state, [action.payload.id]: format(action.payload) };
    case DELETE_ASSIGNMENT:
      return _.omit(state, action.payload);
    case FETCH_ASSIGNMENTS:
      return _.chain(action.payload).mapKeys("id").mapValues(format).value();
    default:
      return state;
  }
};

export default assignmentReducer;
