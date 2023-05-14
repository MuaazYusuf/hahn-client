import { Action, createReducer, on } from '@ngrx/store';

import { UserStateInterface } from '../types/user-state.interface';
import { addUserAction, addUserFailureAction, addUserSuccessAction } from './add-user.action';
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from './update-user.action';

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
    })),
    on(
        updateUserAction,
        (state): UserStateInterface => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })),
    on(updateUserSuccessAction, (state, action): UserStateInterface => ({
        ...state,
        isSubmitting: false,
        user: action.user
    })),
    on(updateUserFailureAction, (state, action): UserStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
);

export function reducers(state: UserStateInterface, action: Action) {
    return userReducer(state, action)
}