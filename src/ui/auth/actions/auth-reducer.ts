import { Action, createReducer, on } from "@ngrx/store";
import { LoginStateInterface } from "src/core/common/interface/state/login-state.interface";
import { loginAction, loginFailureAction, loginSuccessAction, logoutAction } from "./login-action";

const initialState: LoginStateInterface = {
    isAuthenticated: false,
    loginResponse: null,
    errorMessage: null
}

const authReducer = createReducer(
    initialState,
    on(
        loginAction,
        (state): LoginStateInterface => ({
            ...state,
            isAuthenticated: false,
            errorMessage: null
        })),
    on(
        loginSuccessAction,
        (state, action): LoginStateInterface => ({
            ...state,
            isAuthenticated: true,
            loginResponse: action.loginResponse
        })
    ),
    on(
        loginFailureAction,
        (state, action): LoginStateInterface => ({
            ...state,
            isAuthenticated: false,
            errorMessage: action.errorMessage
        })
    ),
    on(
        logoutAction,
        (state, action): LoginStateInterface => ({
            ...state,
            isAuthenticated: false,
            loginResponse: null,
            errorMessage: null,
        })
    )
)

export function authReducers(state: LoginStateInterface, action: Action) {
    return authReducer(state, action)
}