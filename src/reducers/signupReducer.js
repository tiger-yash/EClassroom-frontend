import { SIGNUP_LOAD } from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_LOAD:
      console.log(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
