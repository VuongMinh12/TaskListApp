import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = 'http://localhost:5058/api/';
  constructor(private http: HttpClient) { }

  Login(data : any) {
    return this.http.post(this.apiUrl + 'Login',data );

  }

  setUserInfoLocalStorage(user: any){
    localStorage.setItem("UserId", user.userId);
    localStorage.setItem("Email", user.email);
    localStorage.setItem("Username", user.userName);
    localStorage.setItem("RoleId", user.roleId);
    localStorage.setItem("Token", user.token);
  }

}
