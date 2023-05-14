import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ValidationErrors } from 'fluentvalidation-ts';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { BackendErrorsInterface } from 'src/core/common/backend-errors.interface';
import { AddUserRequest } from 'src/core/data/model/add-user.request';
import { AddUserFormValidator } from 'src/core/data/validator/add-user.validators';
import { UserService } from 'src/core/service/user.service';

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
  backendValidationMessages: BackendErrorsInterface | null;
  isSubmitting$: Observable<boolean>;
  formValidationErrors: ValidationErrors<AddUserRequest> = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private store: Store<UserStateInterface>,
    private addUserFormValidator: AddUserFormValidator
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.backendErrors$.subscribe((backendValidationMessages) => this.backendValidationMessages = backendValidationMessages);
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
    this.user = this.userForm.value;
    if (this.userForm.value.dateOfBirth.year && this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day)
      this.user.dateOfBirth = new Date(this.userForm.value.dateOfBirth.year, this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day);
    this.formValidationErrors = await this.addUserFormValidator.validateAsync(this.user);
    // If no validation errors create user
    if ((Object.keys(this.formValidationErrors).length === 0)) {
      return this.store.dispatch(addUserAction({ request: this.user }));
    }
    return this.toastr.error("Please enter valid inputs");
  }

  goToUserList() {
    this.router.navigate(['users']);
  }
}
