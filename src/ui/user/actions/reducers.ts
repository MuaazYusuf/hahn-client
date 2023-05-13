import { Action, createReducer, on } from "@ngrx/store";

import { UserStateInterface } from "./user-state.interface";
import { addUserAction } from "./add-user.action";

const initialState: UserStateInterface = {
    isSubmitting: false
}

const userReducer = createReducer(
    initialState,
    on(
        addUserAction,
        (state): UserStateInterface => ({
            ...state,
            isSubmitting: true
        })));

export function reducers(state: UserStateInterface, action: Action) {
    return userReducer(state, action)
}