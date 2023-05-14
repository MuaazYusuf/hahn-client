import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ValidationErrors } from 'fluentvalidation-ts';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserRequest } from 'src/core/data/model/update-user.request';

import { User } from 'src/core/data/model/user';
import { UpdateUserFormValidator } from 'src/core/data/validator/update-user.validator';
import { UserService } from 'src/core/service/user.service';

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
    formValidationErrors: ValidationErrors<UpdateUserRequest> = {};

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private updateUserFormValidator: UpdateUserFormValidator,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['userId'];
        this.initializeForm();
        this.getUserDetailById();

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

        if (!this.formValidationErrors) {
            return this.userService.updateUser(this.user.id, this.user).subscribe(async (response: any) => {
                if (response != null && response.code === 200) {
                    this.toastr.success(response.message);
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 500);
                }
            },
                async error => {
                    this.toastr.error(error.message);
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 500);
                });
        }
        return this.toastr.error("Please enter valid inputs");
    }
}