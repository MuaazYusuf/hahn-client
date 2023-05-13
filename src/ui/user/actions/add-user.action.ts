import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/core/common/enum";
import { AddUserRequest } from "src/core/data/model/add-user.request";
import { User } from "src/core/data/model/user";

export const addUserAction = createAction(
    ActionTypes.ADD_USER,
    props<{ request: AddUserRequest }>()
);

export const addUserSuccessAction = createAction(
    ActionTypes.ADD_USER_SUCCESS,
    props<{ user: User }>()
)

export const addUserFailureAction = createAction(
    ActionTypes.ADD_USER_FAILURE
)