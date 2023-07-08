import { environment } from "src/environments/environment";
export class Constants {
    static API_URL_BASE = environment.base_url + environment.api_prefix + environment.api_version;
    static USERS_API_URL = Constants.API_URL_BASE + 'users';
    static AUTH_API_URL = Constants.API_URL_BASE + 'auth';
    static REFRESH_TOKEN_API_URL = Constants.AUTH_API_URL + '/refresh-token';
    static LOGIN_API_URL = Constants.AUTH_API_URL + '/login'
    static AUTH_TOKEN = 'token';
    static REFRESH_TOKEN = 'refreshToken';
}