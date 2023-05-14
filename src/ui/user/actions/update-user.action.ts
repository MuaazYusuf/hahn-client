import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/core/common/backend-errors.interface';
import { ActionTypes } from 'src/core/common/enum';
import { UpdateUserRequest } from 'src/core/data/model/update-user.request';
import { User } from 'src/core/data/model/user';

export const updateUserAction = createAction(
    ActionTypes.UPDATE_USER,
    props<{ id: number, request: UpdateUserRequest }>()
);

export const updateUserSuccessAction = createAction(
    ActionTypes.UPDATE_USER_SUCCESS,
    props<{ user: User }>()
)

export const updateUserFailureAction = createAction(
    ActionTypes.UPDATE_USER_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)