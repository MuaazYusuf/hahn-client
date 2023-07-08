import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/core/common/enum";
import { LoginRequest } from "src/core/data/model/login.request";
import { LoginResponse } from "src/core/data/model/response/login.response";

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ request: LoginRequest }>()
);

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ loginResponse: LoginResponse }>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{errorMessage: string}>()
)