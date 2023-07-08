import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../data/model/response/login.response';
import { Constants } from '../common/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private refreshTokenApiUrl = Constants.REFRESH_TOKEN_API_URL;
    constructor(private router: Router, private jwtHelper: JwtHelperService, private http: HttpClient) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem(Constants.AUTH_TOKEN);        
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }

        const isRefreshSuccess = await this.tryRefreshingTokens(token);
        if (!isRefreshSuccess) {
            this.router.navigate(["auth/login"]);
        }

        return isRefreshSuccess;
    }

    private async tryRefreshingTokens(token: string | null): Promise<boolean> {
        // Try refreshing tokens using refresh token
        const refreshToken: string | null = localStorage.getItem(Constants.REFRESH_TOKEN);
        if (!token || !refreshToken) {
            return false;
        }

        const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
        let isRefreshSuccess: boolean;

        const refreshRes = await new Promise<LoginResponse>((resolve, reject) => {
            this.http.post<LoginResponse>(this.refreshTokenApiUrl, credentials, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }).subscribe({
                next: (res: LoginResponse) => resolve(res),
                error: (_) => { reject; isRefreshSuccess = false; }
            });
        });

        localStorage.setItem(Constants.AUTH_TOKEN, refreshRes.token);
        localStorage.setItem(Constants.REFRESH_TOKEN, refreshRes.refreshToken);
        isRefreshSuccess = true;

        return isRefreshSuccess;
    }
}