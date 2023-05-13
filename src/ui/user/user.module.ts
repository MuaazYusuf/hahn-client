import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgbDatepickerModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { ViewUserComponent } from "./view-user/view-user.component";
import { routes } from "./routes";
import { UserService } from "src/core/service/user.service";
import { reducers } from "./types/reducers";

@NgModule({
    declarations: [
        CreateUserComponent,
        EditUserComponent,
        UserListComponent,
        ViewUserComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NgbDatepickerModule,
        NgbAlertModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('user', reducers)
    ],
    providers: [UserService]
})
export class UserModule { }