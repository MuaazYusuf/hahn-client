import { Action, createReducer, on } from "@ngrx/store";

import { addUserAction, addUserFailureAction, addUserSuccessAction } from "./add-user.action";
import { UserStateInterface } from "../types/user-state.interface";

const initialState: UserStateInterface = {
    isSubmitting: false,
    user: null,
    validationErrors: null
}

const userReducer = createReducer(
    initialState,
    on(
        addUserAction,
        (state): UserStateInterface => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })),
    on(addUserSuccessAction, (state, action): UserStateInterface => ({
        ...state,
        isSubmitting: false,
        user: action.user
    })),
    on(addUserFailureAction, (state, action): UserStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    }))
);

export function reducers(state: UserStateInterface, action: Action) {
    return userReducer(state, action)
}