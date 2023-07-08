import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../common/constants";
import { Observable, map } from "rxjs";
import { LoginRequest } from "../data/model/login.request";
import { LoginResponse } from "../data/model/response/login.response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post(`${Constants.LOGIN_API_URL}`, loginRequest)
            .pipe(map((response: any) => response.data));
    }
}