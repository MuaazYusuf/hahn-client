import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStateInterface } from "./userState.interface";

export const userFeatureSelector = createFeatureSelector<UserStateInterface>('user')

export const isSubmittingSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateInterface) => userState.isSubmitting
)