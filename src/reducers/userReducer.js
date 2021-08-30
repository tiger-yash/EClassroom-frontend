import { FETCH_PROFILE, SIGN_OUT, STUDENT, TEACHER } from "../constants";
const INITIAL_STATE = {
  username: null,
  email: null,
  isStudent: null,
  isTeacher: null,
  role: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      const data = action.payload;
      const role = action.payload.isStudent ? STUDENT : TEACHER;
      console.log({ ...state, ...data, role });
      console.log({ state });
      console.log({ ...data, role });
      return { ...state, ...data, role };
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
