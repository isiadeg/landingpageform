import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user/user.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {UsersComponent} from './users/users.component'

const routes: Routes = [{
  path: 'user/:id', component: UserComponent,
},
{
  path: 'users', component: UsersComponent
},
{
  path: "", redirectTo: "users", pathMatch: "full"
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
