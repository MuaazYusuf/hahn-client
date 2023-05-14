import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStateInterface } from "../types/user-state.interface";

export const userFeatureSelector = createFeatureSelector<UserStateInterface>('user')

export const isSubmittingSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateInterface) => userState.isSubmitting
)

export const validationErrorsSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateInterface) => userState.validationErrors
)