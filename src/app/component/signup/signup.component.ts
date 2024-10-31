import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  ngOnInit(): void {
   }

  constructor(
    private service : LoginService,
    private router : Router,
    private toastService : ToastService
  ){}

  inputEmail = "";
  inputFName = "";
  inputLName = "";
  inputPw = "";
  inputPwCheck = "";

  hide = signal(true);
  hide2 = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }


  errPassword = '';
  errSignup = '';

  signup() {
    if (this.inputEmail != "" && this.inputFName != "" && this.inputLName != "" && this.inputPw != "" && this.inputPwCheck != "" ) {
      this.errSignup = '';
      if (this.inputPw !== this.inputPwCheck) {
        this.errPassword = 'Mật khẩu không khớp!';
        return;
      }
      let request = {
        Firstname: this.inputFName,
        Lastname: this.inputLName,
        Password: this.inputPw,
        Email: this.inputEmail,
        RoleId : 1
      };
      this.service.Signup(request).subscribe((response: any) => {
        if (response.status == 1) {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          this.toastService.show(response.message,response.status);
        } else {
          this.toastService.show(response.message,response.status);
        }
      });
    } else {
      this.errSignup = 'Vui lòng điền đầy đủ thông tin!';
    }
  }

  errorMessage = '';
  validateMail() {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    if (this.inputEmail.trim() === '') {
      this.errorMessage = '';
    } else if (!emailPattern.test(this.inputEmail)) {
      this.errorMessage = 'Email không hợp lệ! Hãy nhập lại email';
    } else {
      this.errorMessage = '';
    }
  }
}
