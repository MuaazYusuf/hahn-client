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


import { routes } from "./routes";
import { UserService } from "src/core/service/user.service";
import { reducers } from "./actions/reducers";
import { EffectsModule } from "@ngrx/effects";
import { AddUserEffect } from "./effects/add-user.effect";
import { AddUserFormValidator } from "src/core/data/validator/add-user.validators";
import { UpdateUserFormValidator } from "src/core/data/validator/update-user.validator";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { ViewUserComponent } from "./components/view-user/view-user.component";

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
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([AddUserEffect])
    ],
    providers: [UserService, AddUserFormValidator, UpdateUserFormValidator]
})
export class UserModule { }