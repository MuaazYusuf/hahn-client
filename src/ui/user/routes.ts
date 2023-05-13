import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewUserComponent } from './view-user/view-user.component';



export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserListComponent },
      { path: 'add', component: CreateUserComponent },
      { path: 'edit/:userId', component: EditUserComponent },
      { path: 'view/:userId', component: ViewUserComponent }
    ],
  },

]

