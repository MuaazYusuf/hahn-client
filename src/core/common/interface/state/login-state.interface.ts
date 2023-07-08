import { LoginResponse } from "src/core/data/model/response/login.response";

export interface LoginStateInterface {
    isAuthenticated: boolean;
    loginResponse: LoginResponse | null;
    errorMessage: string | null;
}