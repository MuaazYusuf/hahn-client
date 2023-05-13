import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/core/data/model/user';
import { UserService } from 'src/core/service/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  date: NgbDateStruct;
  user: User = new User();
  userForm: FormGroup;
  errors: string[];
  errs: { [key: string]: string } = {};

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.errors = [];
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.user.firstName = this.userForm.value.firstName;
      this.user.lastName = this.userForm.value.lastName;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      this.user.username = this.userForm.value.username;
      this.user.phoneNumber = this.userForm.value.phoneNumber;
      this.user.dateOfBirth = new Date(this.userForm.value.dateOfBirth.year, this.userForm.value.dateOfBirth.month - 1, this.userForm.value.dateOfBirth.day);
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
                this.errors.push(validationErrorDictionary[fieldName]);
                this.errs[fieldName.toLowerCase()] = validationErrorDictionary[fieldName];
                console.log(this.errs);
              }
            }
            console.log(this.userForm);
          } else {
            this.toastr.error("Something went wrong!");
          }
        });
    }
  }

  goToUserList() {
    this.router.navigate(['users']);
  }
}
