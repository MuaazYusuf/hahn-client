import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/ui/create-user/create-user.component';
import { EditUserComponent } from 'src/ui/edit-user/edit-user.component';
import { UserListComponent } from 'src/ui/user-list/user-list.component';
import { ViewUserComponent } from 'src/ui/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: CreateUserComponent },
  { path: 'edit/:userId', component: EditUserComponent },
  { path: 'view/:userId', component: ViewUserComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
