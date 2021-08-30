import axios from "axios";
import Cookies from "js-cookie";

const apiInstanceObject = () =>
  axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `Token ${Cookies.get("token")}`
    }
  });

const api = (...args) => apiInstanceObject()(...args);

const methods = ["get", "delete", "head", "options", "request", "options", "post", "put", "patch"];
for (let method of methods) {
  api[method] = (...args) => apiInstanceObject()[method](...args);
}

export default api;

// const api = {
//   get: function (...args) {
//     return apiInstanceObject().get(...args);
//   },
//   post: function (...args) {
//     return apiInstanceObject().post(...args);
//   },
//   put: function (...args) {
//     return apiInstanceObject().put(...args);
//   },
//   patch: function (...args) {
//     return apiInstanceObject().patch(...args);
//   },
//   delete: function (...args) {
//     return apiInstanceObject().delete(...args);
//   }
// };

// export const getApi = () =>
//   axios.create({
//     baseURL: "http://localhost:8000",
//     headers: {
//       Authorization: `Token ${Cookies.get("token")}`
//     }
//   });
