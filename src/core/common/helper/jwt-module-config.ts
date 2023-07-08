import { JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants';

export function getToken(): string | null {
  const token: string | null = localStorage.getItem(Constants.AUTH_TOKEN);
  return token;
}

export const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: getToken,
    allowedDomains: environment.white_listed_Domains,
    headerName: 'Authorization',
    authScheme: 'Bearer ',
  },
};