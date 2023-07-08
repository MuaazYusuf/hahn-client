import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginStateInterface } from "src/core/common/interface/state/login-state.interface";

export const authFeatureSelector = createFeatureSelector<LoginStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (loginState: LoginStateInterface) => loginState.isAuthenticated
)

export const validationErrorsSelector = createSelector(
    authFeatureSelector,
    (loginState: LoginStateInterface) => loginState.errorMessage
)