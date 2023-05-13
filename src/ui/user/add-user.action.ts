import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/core/common/enum";

export const addUserAction = createAction(
    ActionTypes.ADD_USER,
    props<{
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        username: string;
        dateOfBirth: Date;
        phoneNumber: string;
    }>()
);