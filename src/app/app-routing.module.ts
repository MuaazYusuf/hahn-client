import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/ui/home/home.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('../ui/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('../ui/auth/auth.module').then((m => m.AuthModule))
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
