import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
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
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {

  constructor(
    private service : LoginService,
    private router : Router,
    private toastService : ToastService
  ){}
  ngOnInit(): void {  }

  inputFName = "";
  inputLName = "";
  inputPw = "";
  inputPwCheck = "";
  inputEmail = "";

  errPassword ='';
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

  errUpdate= '';
  UpdatePass(){
    if(this.inputEmail == '' || this.inputFName == '' || this.inputLName == '' || this.inputPw == '' || this.inputPwCheck == ''){
      this.errUpdate ='Vui lòng điền đầy đủ thông tin!';
    }else {
      this.errUpdate = '';
      if (this.inputPw !== this.inputPwCheck) {
        this.errPassword = 'Mật khẩu không khớp!';
      }
      let request = {
        FirstName: this.inputFName,
        LastName: this.inputLName,
        Password: this.inputPw,
        Email: this.inputEmail,
        RoleId : 1
      };

      this.service.Forgotpass(request).subscribe((response: any) => {
        if (response.status == 1) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          this.toastService.show(response.message,response.status);
        } else {
          this.toastService.show(response.message,response.status);
        }
      });
    }
  }

}
