import {
  CREATE_CLASS,
  FETCH_CLASS,
  FETCH_CLASSES,
  DELETE_CLASS,
  LEAVE_CLASS,
  JOIN_CLASS,
  SIGN_OUT
} from "../constants";
import _ from "lodash";
const INITIAL_STATE = {};

const format = data => {
  return {
    id: data.id,
    classCode: data.class_code,
    subject: data.subject,
    teacher: data.teacher,
    students: data.students
  };
};
const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      return { ...state, [action.payload.id]: format(action.payload) };
    case JOIN_CLASS:
      return { ...state, [action.payload.id]: format(action.payload) };
    case FETCH_CLASS:
      return { ...state, [action.payload.id]: format(action.payload) };
    case DELETE_CLASS:
      return _.omit(state, action.payload);
    case LEAVE_CLASS:
      return _.omit(state, action.payload);
    case FETCH_CLASSES:
      return _.chain(action.payload).mapKeys("id").mapValues(format).value();
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default classReducer;
