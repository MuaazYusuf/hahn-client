import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/core/data/model/user';
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

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['userId'];
        this.getUserDetailById();
    }
    getUserDetailById() {
        this.userService.getUserById(this.userId).subscribe((response: any) => {
            if (response != null && response.data != null) {
                var resultData : User = response.data;
                if (resultData) {
                    resultData.dateOfBirth = new Date(resultData.dateOfBirth);
                    this.user = resultData
                    this.date = { day: resultData.dateOfBirth.getUTCMonth(), month: resultData.dateOfBirth.getUTCMonth(), year: resultData.dateOfBirth.getFullYear() }
                }
            }
        },
            (error: any) => { });
    }

    editUser(isValid: any) {
        this.isSubmitted = true;
        if (isValid) {
            this.user.dateOfBirth = new Date(this.date.year, this.date.month - 1, this.date.day);
            this.userService.updateUser(this.user.id, this.user).subscribe(async (response: any) => {
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
    }
}