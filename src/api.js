import axios from "axios";
// import { store } from "./index";

export default axios.create({
  baseURL: "http://localhost:8000"
  // headers: {
  //   authorization: `Token ${() => store.getState().auth.userToken}`
  // }
});
