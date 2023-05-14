import { AsyncValidator } from "fluentvalidation-ts";
import { UpdateUserRequest } from "../model/update-user.request";

export class UpdateUserFormValidator extends AsyncValidator<UpdateUserRequest> {
    constructor() {
        super();

        this.ruleFor('firstName')
            .notEmpty()
            .withMessage('First name is required.')
            .maxLength(50)
            .withMessage('First name cannot exceed 50 characters.');

        this.ruleFor('lastName')
            .notEmpty()
            .withMessage('Last name is required.')
            .maxLength(50)
            .withMessage('Last name cannot exceed 50 characters.');
        this.ruleFor('dateOfBirth').notNull().withMessage('Date of birth').must(date => date instanceof Date).withMessage("Date of birth must be valid");

        this.ruleFor('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required.')
            .matches(/^[0-9]{10}$/)
            .withMessage('Invalid phone number.');
    }

}