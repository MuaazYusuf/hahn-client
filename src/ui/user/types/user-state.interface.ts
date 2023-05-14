import { BackendErrorsInterface } from "src/core/common/backend-errors.interface";
import { User } from "src/core/data/model/user";

export interface UserStateInterface {
    isSubmitting: boolean;
    user: User | null;
    validationErrors: BackendErrorsInterface | null
}