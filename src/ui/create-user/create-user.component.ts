import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/core/data/model/user';
import { UserService } from 'src/core/service/user.service';
import { Validator } from "fluentvalidation-ts";



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  userForm: FormGroup;
  isSubmitted: boolean = false;

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
  }

  addUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.userService.createUser(this.user).subscribe(async (data: any) => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.goToUserList()
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        });
    }
  }

  goToUserList() {
    this.router.navigate(['users']);
  }

  onSubmit() {

  }
}
