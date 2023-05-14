import { Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';




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

