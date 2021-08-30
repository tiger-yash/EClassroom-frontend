import { LOGIN_LOAD } from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_LOAD:
      return { state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
