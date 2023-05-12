import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/core/data/model/user';
import { UserService } from 'src/core/service/user.service';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

    userId: any;
    userDetails: User;

    constructor(private route: ActivatedRoute, public userService: UserService) { }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['userId'];
        this.getUserDetailById();
    }

    getUserDetailById() {
        this.userService.getUserById(this.userId).subscribe((response: any) => {
            if (response != null && response.data != null) {
                var resultData = response.data;
                if (resultData) {
                    this.userDetails = resultData;
                }
            }
        },
            (error: any) => { });
    }

}