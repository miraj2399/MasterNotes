import AxiosInstance from "./AxiosInstance";
//this function serves to make the post request to the endpoint "/users/login". It sends the data that is provided as a argument
export function LoginService(data) {
    return AxiosInstance.post("/users/login", data);
}
//this function serves to make the post request to the endpoint "/users/signup". It sends the data that is provided as a argument
export function SignUpService(data) {
    return AxiosInstance.post("/users/signup", data);
}