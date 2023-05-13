import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { ViewUserComponent } from "./view-user/view-user.component";
import { routes } from "./routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgbDatepickerModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { UserService } from "src/core/service/user.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        CreateUserComponent,
        EditUserComponent,
        UserListComponent,
        ViewUserComponent
    ],
    imports: [
        RouterModule.forChild(routes), MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NgbDatepickerModule,
        NgbAlertModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
    ],
    providers: [UserService]
})
export class UserModule { }