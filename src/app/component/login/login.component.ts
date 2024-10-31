import { Component, OnInit, signal } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  inputEmail: string = '';
  inputPw: string = '';

  constructor(private service: LoginService, private router: Router, private toastService : ToastService) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  role: number = 0;
  errLogin = '';
  login() {
    if (this.inputEmail != '' && this.inputPw !='' ){
      this.errLogin = '';
      let request = {
        email: this.inputEmail,
        password: this.inputPw,
      };
      this.service.Login(request).subscribe((response: any) => {
        if (response.status == 1) {
          this.service.setUserInfoLocalStorage(response);
          this.toastService.show(response.message,response.status);
          this.router.navigate(['/taskboard']);
        } else {
          this.toastService.show(response.message,response.status);
        }
      });
    }else {
        this.errLogin = 'Vui lòng nhập đầy đủ thông tin';
    }

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
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
