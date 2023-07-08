import { Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AuthGuard } from 'src/core/guard/auth.guard';




export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'add', component: CreateUserComponent, canActivate: [AuthGuard] },
      { path: 'edit/:userId', component: EditUserComponent, canActivate: [AuthGuard] },
      { path: 'view/:userId', component: ViewUserComponent, canActivate: [AuthGuard] }
    ],
  },

]

