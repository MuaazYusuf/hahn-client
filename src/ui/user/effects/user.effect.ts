import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/core/data/model/user';
import { UserService } from 'src/core/service/user.service';

import { addUserAction, addUserFailureAction, addUserSuccessAction } from '../actions/add-user.action';
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from '../actions/update-user.action';

@Injectable()
export class UserEffect {
    constructor(private actions$: Actions, private userService: UserService, private router: Router, private toastr: ToastrService) { }

    addUser$ = createEffect(
        () => { return this.actions$.pipe(
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
        });

    redirectAfterSubmit$ = createEffect(
        () => this.actions$.pipe(
            ofType(addUserSuccessAction, updateUserSuccessAction),
            map((action) => {
                if (action.type === addUserSuccessAction.type) {
                    return 'User added successfully';
                } else {
                    return 'User updated successfully';
                }
            }),
            tap((message) => {
                this.router.navigateByUrl('/');
                this.toastr.success(message);
            })
        ),
        { dispatch: false }
    );

    updateUser$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(updateUserAction),
                switchMap(({ id, request }) => {
                    return this.userService.updateUser(id, request).pipe(
                        map((user: User) => {
                            return updateUserSuccessAction({ user })
                        }),
                        catchError((errorResponse: HttpErrorResponse) => {
                            return of(updateUserFailureAction({ errors: errorResponse.error.errors }))
                        })
                    )
                })
            )
        });
}