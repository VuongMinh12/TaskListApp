import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';

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
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {

  constructor(
    private service : LoginService,
    private router : Router
  ){}
  ngOnInit(): void {  }

  inputFName = "";
  inputLName = "";
  inputPw = "";
  inputPwCheck = "";
  inputEmail = "";

  validateMail() {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(this.inputEmail)) {
      alert('Email không hợp lệ! Hãy nhập lại thông tin');
    }
  }

  UpdatePass(){
    if (this.inputEmail != "" && this.inputFName != "" && this.inputLName != "" && this.inputPw != "" && this.inputPwCheck != "") {
      if (this.inputPw !== this.inputPwCheck) {
        alert('Mật khẩu không khớp!');
        return;
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
          alert(response.message)
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }
}
