import { AsyncValidator } from "fluentvalidation-ts";
import { AddUserRequest } from "../model/add-user.request";

export class AddUserFormValidator extends AsyncValidator<AddUserRequest> {
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

        this.ruleFor('password')
            .notEmpty()
            .withMessage('Password is required.')
            .length(6, 20)
            .withMessage('Password must be between 6 and 20 characters.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%+.*_?&#-]{8,15}$/)
            .withMessage('Invalid password format');

        this.ruleFor('email')
            .notEmpty()
            .withMessage('Email is required.')
            .emailAddress()
            .withMessage('Invalid email address.');

        this.ruleFor('username')
            .notEmpty()
            .withMessage('Username is required.')
            .maxLength(50)
            .withMessage('Username cannot exceed 50 characters.');

        this.ruleFor('dateOfBirth').notNull().withMessage('Date of birth').must(date => date instanceof Date).withMessage("Date of birth must be valid");

        this.ruleFor('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required.')
            .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
            .withMessage('Invalid phone number.');
    }
}