import { push } from "connected-react-router";
import {
  SIGN_IN,
  SIGN_OUT,
  GAUTH_SIGN_IN,
  GAUTH_SIGN_OUT,
  FETCH_PROFILE,
  CREATE_CLASS,
  JOIN_CLASS,
  FETCH_CLASS,
  FETCH_CLASSES,
  DELETE_CLASS,
  LEAVE_CLASS,
  FETCH_TESTS,
  CREATE_TEST,
  EDIT_ASSIGNMENT,
  EDIT_TEST,
  DELETE_TEST,
  SUBMIT_TEST,
  FETCH_ASSIGNMENTS,
  FETCH_ASSIGNMENT,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  SUBMIT_ASSIGNMENT
} from "../constants";
import { getGoogleID, tryGoogleSignOut } from "../gauth";
import api from "../api";
import Cookies from "js-cookie";

export const redirect = path => async dispatch => {
  return dispatch(push(path));
};

export const signOut = () => async dispatch => {
  Cookies.remove("token");
  await dispatch(redirect("/"));
  await tryGoogleSignOut();
  return dispatch({
    type: SIGN_OUT
  });
};

export const signIn = userToken => {
  Cookies.set("token", userToken);
  if (userToken)
    return {
      type: SIGN_IN,
      payload: userToken
    };
};

export const changeAuthGoogle = status => {
  if (status) {
    const googleID = getGoogleID();
    return {
      type: GAUTH_SIGN_IN,
      payload: googleID
    };
  } else {
    return {
      type: GAUTH_SIGN_OUT
    };
  }
};

export const fetchUserProfile = () => async dispatch => {
  await api.get("/auth/profile/").then(({ data }) => {
    dispatch({
      type: FETCH_PROFILE,
      payload: data
    });
  });
  // .catch(error => {
  //   if (error.response && error.response.data) console.log(error.response.data);
  //   console.dir(error.request);
  // });
};

export const createClass = classData => async dispatch => {
  const response = await api.post("/class/", classData);
  const { data } = response;
  console.log(response);
  dispatch({
    type: CREATE_CLASS,
    payload: data
  });
};

export const joinClass = classCode => async dispatch => {
  const response = await api.post("/path/for/join/class/", { class_code: classCode });
  const { data } = response;
  dispatch({
    type: JOIN_CLASS,
    payload: data
  });
};

export const leaveClass = (classCode, classId) => async dispatch => {
  await api.post("/path/for/leave/class/", { class_code: classCode });
  // const { data } = response;
  dispatch({
    type: LEAVE_CLASS,
    payload: classId
  });
};

export const deleteClass = (classCode, classId) => async dispatch => {
  await api.delete("/class/", {
    class_code: classCode
  });
  // const { data } = response;
  dispatch({
    type: DELETE_CLASS,
    payload: classId
  });
};

export const fetchClass = classId => async dispatch => {
  const response = await api.get(`/class/${classId}/`);
  const { data } = response;
  dispatch({
    type: FETCH_CLASS,
    payload: data
  });
};

export const fetchAllClasses = () => async dispatch => {
  const response = await api.get("/class/");
  const { data } = response;
  dispatch({
    type: FETCH_CLASSES,
    payload: data.classes
  });
};

export const fetchAllTests = classCode => async dispatch => {
  const response = await api.get(`/class/test/`, { class_code: classCode });
  const { data } = response;
  dispatch({
    type: FETCH_TESTS,
    payload: data
  });
};

export const fetchAllAssignments = classCode => async dispatch => {
  const response = await api.get(`/class/assignment/`, { class_code: classCode });
  const { data } = response;
  dispatch({
    type: FETCH_ASSIGNMENTS,
    payload: data
  });
};

export const fetchTest = (classCode, testId) => async dispatch => {
  const response = await api.get(`/student/test/${testId}/`, { class_code: classCode });
  const { data } = response;
  dispatch({
    type: FETCH_TESTS,
    payload: data
  });
};

export const fetchAssignment = (classCode, assignmentId) => async dispatch => {
  const response = await api.get(`/student/assignment/${assignmentId}/`, { class_code: classCode });
  const { data } = response;
  dispatch({
    type: FETCH_ASSIGNMENT,
    payload: data
  });
};

export const createTest = testData => async dispatch => {
  const response = await api.post("/class/test/", testData);
  const { data } = response;
  dispatch({
    type: CREATE_TEST,
    payload: data
  });
};

export const createAssignment = assignmentData => async dispatch => {
  const response = await api.post("/class/assignment/", assignmentData);
  const { data } = response;
  dispatch({
    type: CREATE_ASSIGNMENT,
    payload: data
  });
};

export const editTest = (classCode, testData) => async dispatch => {
  const response = await api.post("/class/test/", testData);
  const { data } = response;
  dispatch({
    type: EDIT_TEST,
    payload: data
  });
};

export const editAssignment = (classCode, assignmentData) => async dispatch => {
  const response = await api.post("/class/assignment/", assignmentData);
  const { data } = response;
  dispatch({
    type: EDIT_ASSIGNMENT,
    payload: data
  });
};

export const deleteTest = (classCode, testId) => async dispatch => {
  const response = await api.delete("/class/test/", { id: testId });
  const { data } = response;
  dispatch({
    type: DELETE_TEST,
    payload: data
  });
};

export const deleteAssignment = (classCode, assignmentId) => async dispatch => {
  const response = await api.delete("/class/assignment/", { id: assignmentId });
  const { data } = response;
  dispatch({
    type: DELETE_ASSIGNMENT,
    payload: data
  });
};

export const submitTest = (classCode, testId, submitURL) => async dispatch => {
  const response = await api.post(`/student/test/${testId}`, { url: submitURL });
  const { data } = response;
  dispatch({
    type: SUBMIT_TEST,
    payload: data
  });
};

export const submitAssignment = (classCode, assignmentId, submitURL) => async dispatch => {
  const response = await api.post(`/student/assignment/${assignmentId}`, { url: submitURL });
  const { data } = response;
  dispatch({
    type: SUBMIT_ASSIGNMENT,
    payload: data
  });
};
