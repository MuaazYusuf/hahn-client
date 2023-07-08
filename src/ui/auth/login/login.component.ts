import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/core/data/model/login.request";
import { loginAction } from "../actions/login-action";
import { LoginStateInterface } from "src/core/common/interface/state/login-state.interface";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { authFeatureSelector } from "../actions/auth-selector";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    invalidLogin: boolean;
    credentials: LoginRequest = { email: '', password: '' };
    loginForm: FormGroup;
    errorMessage: string | null;
    getState: Observable<any>;
    constructor(
        private router: Router,
        private http: HttpClient,
        private fb: FormBuilder,
        private store: Store<LoginStateInterface>
    ) {
        this.initializeForm()
        this.getState = this.store.select(authFeatureSelector);
    }

    ngOnInit(): void {
        this.getState.subscribe((state) => {
            this.errorMessage = state.errorMessage;
        });
    }

    initializeForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    async onSubmit() {
        this.credentials = this.loginForm.value;
        return this.store.dispatch(loginAction({ request: this.credentials }));
    }
}