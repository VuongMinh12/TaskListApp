import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TaskComponent } from './component/task/task.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { StatusComponent } from './component/status/status.component';
import { RoleComponent } from './component/role/role.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {path : 'user', component : UserComponent},
  { path: 'taskboard', component: TaskComponent },
  { path: 'status', component: StatusComponent },
  { path: 'role', component: RoleComponent },
  { path: '**', component: NotfoundComponent },
];



