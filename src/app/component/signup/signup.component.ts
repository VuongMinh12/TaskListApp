import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(
    private service : LoginService,
    private router : Router
  ){}

  inputUName = "";
  inputPw = "";
  inputPwCheck = "";
  inputEmail = "";

  clearInput(){
    this.inputUName = "";
    this.inputPw = "";
    this.inputPwCheck = "";
    this.inputEmail = "";
  }

  // signup(){
  //   if (this.inputUName == "" || this.inputPw == "" || this.inputPwCheck == "" || this.inputEmail == ""){
  //     alert("Nhap day du thong tin")
  //   }else if ( this.inputPwCheck != this.inputPw){
  //     alert ("Password khong trung khop")
  //   }else {
  //     let request = {
  //       Username: this.inputUName,
  //       Password: this.inputPw,
  //       Email: this.inputEmail,
  //       RoleId : 1
  //     };
  //     this.service.Signup(request).subscribe((response: any) => {
  //       if (response.status == 1) {
  //         alert(response.message)
  //         this.router.navigate(['/login']);
  //       } else {
  //         alert(response.message);
  //         this.clearInput();
  //       }
  //     });
  //   }
  // }

  signup() {
    if (this.inputEmail != "" && this.inputUName != "" && this.inputPw != "" && this.inputPwCheck != "") {
      if (this.inputPw !== this.inputPwCheck) {
        alert('Mật khẩu không khớp!');
        return;
      }
      let request = {
        Username: this.inputUName,
        Password: this.inputPw,
        Email: this.inputEmail,
        RoleId : 1
      };
      this.service.Signup(request).subscribe((response: any) => {
        if (response.status == 1) {
          alert(response.message)
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
          this.clearInput();
        }
      });
    } else {
      console.error('Vui lòng điền đầy đủ thông tin!');
    }
  }

  validateMail() {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(this.inputEmail)) {
      alert('Email không hợp lệ! Hay nhap lai thong tin');
      this.inputEmail = "";
      // Có thể hiển thị thông báo lỗi cho người dùng ở đây
    }
  }
}
