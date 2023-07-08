import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/core/service/auth.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login-action";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginResponse } from "src/core/data/model/response/login.response";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffect {
    constructor(private actions$: Actions, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    login$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginAction),
                switchMap(({ request }) => {
                    return this.authService.login(request).pipe(
                        map((loginResponse: LoginResponse) => {
                            localStorage.setItem('token', loginResponse.token);
                            localStorage.setItem('refreshToken', loginResponse.refreshToken);
                            return loginSuccessAction({ loginResponse })
                        }),
                        catchError((errorResponse: HttpErrorResponse) => {
                            return of(loginFailureAction({ errorMessage: errorResponse.error.errors }))
                        })
                    )
                })
            )
        });

    redirectAfterSubmit$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginSuccessAction),
            map((action) => {
                return "Logged in successfully"
            }),
            tap((message) => {
                this.router.navigateByUrl('/');
                this.toastr.success(message);
            })
        ),
        { dispatch: false }
    );
}