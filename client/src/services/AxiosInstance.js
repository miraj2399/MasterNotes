import axios from "axios";
import Cookies from "js-cookie";
//this file will get the bearer token that will serve as the Authorization for all the requests made. This token will be added to the headers as the Authorization field and returned. If there is an error in obtaining this token, then the request will be rejected.
const AxiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
});


AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default AxiosInstance;