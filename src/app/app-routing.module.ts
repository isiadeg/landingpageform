import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user/user.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginGuard} from './login.guard';

const routes: Routes = [{
  path: 'user/:id', component: UserComponent, canActivate:[LoginGuard]
},
{
  path: 'login', component: LoginComponent
},
{
  path :'register', component:RegisterComponent
},
{
  path: "", redirectTo: "login", pathMatch: "full"
},
{
  path: "**", component: PagenotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
