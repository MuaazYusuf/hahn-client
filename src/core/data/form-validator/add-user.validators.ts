import { Validator } from "fluentvalidation-ts";
import { User } from "../model/user";

export class AddUserFormValidator extends Validator<User> {
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
            .withMessage('Password must be between 6 and 20 characters.');

        this.ruleFor('email')
            .notEmpty()
            .withMessage('Email is required.')
            .emailAddress()
            .withMessage('Invalid email address.');

        this.ruleFor('userName')
            .notEmpty()
            .withMessage('Username is required.')
            .maxLength(50)
            .withMessage('Username cannot exceed 50 characters.');

        this.ruleFor('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required.')
            .matches(/^[0-9]{10}$/)
            .withMessage('Invalid phone number.');
    }
}