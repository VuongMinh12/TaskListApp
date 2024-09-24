import { Component, OnInit, signal } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


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
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  inputUName: string = "";
  inputPw: string = ""

  constructor(
    private service : LoginService,
    private router: Router
  ){}

  ngOnInit(): void {

  }

  login(){
    if(this.inputUName == "" || this.inputPw == "") alert("Nhap day du thong tin");
    let request = {
      username: this.inputUName,
      password: this.inputPw
    }

    this.service.Login(request).subscribe((response: any) => {
      if(response.status == 1) {
        console.log(response);
        this.service.setUserInfoLocalStorage(response);
        alert("Xin chao " + response.userName)
        this.router.navigate(["/taskboard",]);
      }
      else
        {
          alert("Dang nhap that bai");
          this.inputUName == " ",
          this.inputPw == " ";
         }
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
