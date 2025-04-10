import axios from "axios";
import { store } from "../store/store";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  // baseURL: "http://ws-srv-php.in.webmyne.com:5005/api/v1",
});

axiosConfig.defaults.headers.common["Authkey"] =
  import.meta.env.VITE_REACT_APP_AUTH_KEY;
// axiosConfig.defaults.headers.common["Authkey"] =
// "2yifg43454jfglfgjhljgf34545345fldjgljfg55654KLGH4534534";

axiosConfig.interceptors.request.use(
  (request) => {
    console.log(request);

    request.headers["Authorization"] = localStorage.getItem("authToken");

    return request;
  },
  (error) => {
    return error;
  }
);

axiosConfig.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("Error:", error);

    if (error?.response?.status === 500) {
      if (error?.response?.data?.error === "Token is not valid") {
        alert("Token Expired");
        axiosConfig.defaults.headers.common["authToken"] = false;
        store.dispatch({ type: "LOGOUT" });
        localStorage.removeItem("authToken");
      } else {
        alert(error?.response?.data?.message);
      }
    } else {
      alert("Token has Expired");
      axiosConfig.defaults.headers.common["authToken"] = false;
      store.dispatch({ type: "LOGOUT" });
      // localStorage.removeItem("authToken");
    }
    return error;
  }
);

export default axiosConfig;
