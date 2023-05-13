import { environment } from "src/environments/environment";

export class Constants {
    static API_URL_BASE = environment.base_url + environment.api_prefix + environment.api_version;
    static USERS_API_URL = Constants.API_URL_BASE + 'users'
}