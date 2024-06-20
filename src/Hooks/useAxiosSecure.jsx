import axios from "axios";
import useAuth from "./useAuth";
import auth from "../firebase/firebase.init";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut(auth);
      }
      Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
