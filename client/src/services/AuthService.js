import AxiosInstance from "./AxiosInstance";

export function LoginService(data) {
    return AxiosInstance.post("/users/login", data);
}
export function SignUpService(data) {
    return AxiosInstance.post("/users/signup", data);
}