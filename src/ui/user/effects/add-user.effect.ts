import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUserAction, addUserFailureAction, addUserSuccessAction } from "../actions/add-user.action";
import { UserService } from "src/core/service/user.service";
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { User } from "src/core/data/model/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AddUserEffect {
    addUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(addUserAction),
            switchMap(({ request }) => {
                return this.userService.createUser(request).pipe(
                    map((user: User) => {
                        return addUserSuccessAction({ user })
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(addUserFailureAction({ errors: errorResponse.error.errors }))
                    })
                )
            })
        )
    );

    redirectAfterSubmit$ = createEffect(
        () => this.actions$.pipe(
            ofType(addUserSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/')
            })
        ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private userService: UserService, private router: Router) { }
}