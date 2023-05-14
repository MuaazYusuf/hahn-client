import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { UserService } from 'src/core/service/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { AddUserRequest } from 'src/core/data/model/add-user.request';
import { BackendErrorsInterface } from 'src/core/common/backend-errors.interface';
import { AddUserFormValidator } from 'src/core/data/validator/add-user.validators';
import { ValidationErrors } from 'fluentvalidation-ts';
import { addUserAction } from '../../actions/add-user.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../actions/selector';
import { UserStateInterface } from '../../types/user-state.interface';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  date: NgbDateStruct;
  user: AddUserRequest = new AddUserRequest();
  userForm: FormGroup;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  errorMessages: BackendErrorsInterface = {};
  isSubmitting$: Observable<boolean>;
  formValidationErrors: ValidationErrors<AddUserRequest> = {};

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private store: Store<UserStateInterface>,
    private addUserFormValidator: AddUserFormValidator
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  async onSubmit() {
    // if (this.userForm.valid) {
    this.user = this.userForm.value;
    if (this.userForm.value.dateOfBirth.year && this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day)
      this.user.dateOfBirth = new Date(this.userForm.value.dateOfBirth.year, this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day);
    this.formValidationErrors = await this.addUserFormValidator.validateAsync(this.user);
    if(!this.formValidationErrors) {
      return this.store.dispatch(addUserAction({ request: this.user }))
    }
    this.toastr.error("Please enter valid inputs");
    // this.userService.createUser(this.user).subscribe({
    //   next: async (response: any) => {
    //     if (response != null && response.data != null && response.code === 201) {
    //       this.toastr.success(response.message);
    //       setTimeout(() => {
    //         this.goToUserList()
    //       }, 500);
    //     }
    //   },
    //   error: async error => {
    //     if (error.error.code === 400) {
    //       let validationErrorDictionary: BackendErrorsInterface | null = await lastValueFrom(this.backendErrors$);;
    //       console.log(validationErrorDictionary);
    //       this.toastr.error(error.error.message);
    //       for (var fieldName in validationErrorDictionary) {
    //         if (validationErrorDictionary.hasOwnProperty(fieldName)) {
    //           this.userForm.controls[fieldName.toLowerCase()].setErrors({ invalid: true });
    //           this.errorMessages[fieldName.toLowerCase()] = validationErrorDictionary[fieldName]
    //         }
    //       }
    //     } else {
    //       this.toastr.error("Something went wrong!");
    //     }
    //   }
    // });

    // }
  }

  goToUserList() {
    this.router.navigate(['users']);
  }
}
