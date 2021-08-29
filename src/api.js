import axios from "axios";
// import Cookies from "js-cookie";

export default axios.create({
  baseURL: "http://localhost:8000"
  // xsrfCookieName: "csrftoken",
  // xsrfHeaderName: "X-CSRFToken"
});
