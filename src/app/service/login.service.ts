import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = 'http://localhost:8009/api/User/';
  constructor(private http: HttpClient) { }


  Login(data : any) {
    return this.http.post(this.apiUrl + 'Login',data );
  }

  setUserInfoLocalStorage(user: any){
    localStorage.setItem("UserId", user.userId);
    localStorage.setItem("Email", user.email);
    localStorage.setItem("Username", user.userName);
    localStorage.setItem("RoleId", user.roleId);
    localStorage.setItem("AccessToken", user.token.accessToken);
    localStorage.setItem("RefreshToken", user.token.refreshToken);
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem("RefreshToken");
    if (!refreshToken) {
      return of(null); // No refresh token available
    }

    var request = {
      refreshToken : refreshToken,
      UserId: localStorage.getItem("UserId")
    }

    return this.http.post<any>(this.apiUrl + 'Refresh', request)
      .pipe(
        switchMap(response => {
          if(response.status == 1){
            localStorage.setItem("AccessToken", response.newAccessToken);
            return of(response.newAccessToken); // Return the new access token
          }else{
            console.error("Refresh token failed hihi");
            return of(null); // Handle refresh failure
          }

        }),
        catchError(error => {
          console.error("Refresh token failed", error);
          return of(null); // Handle refresh failure
        })
      );
  }

  Signup (data: any){
    return this.http.post(this.apiUrl + 'Signup' , data);
  }

  Forgotpass (data : any){
    return this.http.post(this.apiUrl + 'ForgotPassword' , data );
  }
}
