import { Component, OnInit, signal } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
    MatButtonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  inputEmail: string = '';
  inputPw: string = '';

  constructor(private service: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.inputEmail == '' || this.inputPw == '')
      alert('Vui lòng nhập đầy đủ thông tin');
    else if (this.inputEmail != '' || this.inputPw != '') {
      let request = {
        email: this.inputEmail,
        password: this.inputPw,
      };

      this.service.Login(request).subscribe((response: any) => {
        if (response.status == 1) {
          this.service.setUserInfoLocalStorage(response);
          this.router.navigate(['/taskboard']);
        } else {
          alert(response.message);
          this.inputEmail == "", this.inputPw == "";
        }
      });
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  validateMail() {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(this.inputEmail)) {
      alert('Email không hợp lệ! Hãy nhập lại email');
    }
  }
}
