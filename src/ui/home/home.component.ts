import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginStateInterface } from 'src/core/common/interface/state/login-state.interface';
import { authFeatureSelector } from '../auth/actions/auth-selector';
import { logoutAction } from '../auth/actions/login-action';
import { Constants } from 'src/core/common/constants';
import { LoginResponse } from 'src/core/data/model/response/login.response';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    errorMessage: string | null;
    getState: Observable<any>;
    isAuthenticated: false;
    loginResponse: LoginResponse;
    constructor(private jwtHelper: JwtHelperService, private store: Store<LoginStateInterface>) {
        this.getState = this.store.select(authFeatureSelector);
    }

    ngOnInit(): void {
        this.getState.subscribe((state) => {            
            this.isAuthenticated = state.isAuthenticated;
            this.loginResponse = state.loginResponse;
            this.errorMessage = state.errorMessage;
        });
    }

    checkTokenExpiration = (): boolean => {
        const token = localStorage.getItem(Constants.AUTH_TOKEN);

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }

        return false;
    }

    logOut = () => {
        return this.store.dispatch(logoutAction());
    }
}