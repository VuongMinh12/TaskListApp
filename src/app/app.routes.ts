import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TaskComponent } from './component/task/task.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { TaskListComponent } from './component/task-list/task-list.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'taskboard', component: TaskComponent },
  { path: 'tasklist', component: TaskListComponent },

];

