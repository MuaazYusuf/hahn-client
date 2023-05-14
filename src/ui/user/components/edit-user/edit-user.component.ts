import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { ValidationErrors } from 'fluentvalidation-ts';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserRequest } from 'src/core/data/model/update-user.request';
import { User } from 'src/core/data/model/user';
import { UpdateUserFormValidator } from 'src/core/data/validator/update-user.validator';
import { UserService } from 'src/core/service/user.service';

import { updateUserAction } from '../../actions/update-user.action';
import { UserStateInterface } from '../../types/user-state.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/core/common/backend-errors.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../actions/selector';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    date: NgbDateStruct;
    user: User = new User();
    userForm: FormGroup;
    isSubmitted: boolean = false;
    userId: any;
    backendErrors$: Observable<BackendErrorsInterface | null>;
    backendValidationMessages: BackendErrorsInterface | null;
    isSubmitting$: Observable<boolean>;
    formValidationErrors: ValidationErrors<UpdateUserRequest> = {};

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private userService: UserService,
        private updateUserFormValidator: UpdateUserFormValidator,
        private fb: FormBuilder,
        private store: Store<UserStateInterface>
    ) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['userId'];
        this.initializeForm();
        this.getUserDetailById();
        this.initializeValues();
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
        this.backendErrors$.subscribe((backendValidationMessages) => this.backendValidationMessages = backendValidationMessages);
    }

    getUserDetailById() {
        this.userService.getUserById(this.userId).subscribe((response: any) => {
            if (response != null && response.data != null) {
                var resultData: User = response.data;
                if (resultData) {
                    resultData.dateOfBirth = new Date(resultData.dateOfBirth);
                    this.user = resultData;
                    this.userForm.patchValue(this.user);
                    this.userForm.patchValue({ dateOfBirth: { day: resultData.dateOfBirth.getUTCDay(), month: resultData.dateOfBirth.getUTCMonth(), year: resultData.dateOfBirth.getFullYear() } });
                }
            }
        },
            (error: any) => { });
    }

    initializeForm(): void {
        this.userForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }

    async onSubmit() {
        this.user = this.userForm.value;
        if (this.userForm.value.dateOfBirth.year && this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day)
            this.user.dateOfBirth = new Date(this.userForm.value.dateOfBirth.year, this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day);
        this.formValidationErrors = await this.updateUserFormValidator.validateAsync(this.user);
        // If no validation errors update user
        if ((Object.keys(this.formValidationErrors).length === 0)) {
            return this.store.dispatch(updateUserAction({ id: this.userId, request: this.user }));
        }
        return this.toastr.error("Please enter valid inputs");
    }
}