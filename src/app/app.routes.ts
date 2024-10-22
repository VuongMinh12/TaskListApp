import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TaskComponent } from './component/task/task.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { AdminComponent } from './component/admin/admin.component';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {path : 'user', component : UserComponent},
  { path: 'taskboard', component: TaskComponent },
  { path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'task', pathMatch: 'full' }, // Redirect đến task khi vào /admin
      { path: 'task', component: TaskComponent },
      { path: 'user', component: UserComponent },  // Đường dẫn cho Task
      // Thêm các route con khác nếu cần
    ]
  },
  { path: '**', component: NotfoundComponent },
];



