import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { User } from 'src/core/data/model/user';
import { UserService } from 'src/core/service/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { addUserAction } from '../actions/add-user.action';
import { isSubmittingSelector } from '../actions/selector';
import { UserStateInterface } from '../types/user-state.interface';
import { AddUserRequest } from 'src/core/data/model/add-user.request';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  date: NgbDateStruct;
  user: AddUserRequest = new AddUserRequest();
  userForm: FormGroup;
  errors: { [key: string]: string } = {};
  isSubmitting$: Observable<boolean>;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private store: Store<UserStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
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

  onSubmit() {
    // if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.user.dateOfBirth = new Date(this.userForm.value.dateOfBirth.year, this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day);
      this.store.dispatch(addUserAction(this.userForm.value));
      this.userService.createUser(this.user).subscribe(async (response: any) => {
        if (response != null && response.data != null && response.code === 201) {
          this.toastr.success(response.message);
          setTimeout(() => {
            this.goToUserList()
          }, 500);
        }
      },
        async error => {

          if (error.error.code === 400) {
            let validationErrorDictionary = error.error.errors;
            this.toastr.error(error.error.message);
            for (var fieldName in validationErrorDictionary) {
              if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                this.userForm.controls[fieldName.toLowerCase()].setErrors({ invalid: true });
                this.errors[fieldName.toLowerCase()] = validationErrorDictionary[fieldName];
              }
            }
          } else {
            this.toastr.error("Something went wrong!");
          }
        });
    // }
  }

  goToUserList() {
    this.router.navigate(['users']);
  }
}
