import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // 5058 8009
  apiUrl : string = 'http://localhost:8009/api/Account/';
  constructor(private http: HttpClient) { }


  Login(data : any) {
    return this.http.post(this.apiUrl + 'Login',data );
  }

  setUserInfoLocalStorage(user: any){
    localStorage.setItem("UserId", user.userId);
    localStorage.setItem("Email", user.email);
    localStorage.setItem("RoleId", user.roleId);
    localStorage.setItem("AccessToken", user.token.accessToken);
    localStorage.setItem("RefreshToken", user.token.refreshToken);
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem("RefreshToken");
    if (!refreshToken) {
      return of(null);
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
            return of(response.newAccessToken);
          }else{
            console.error("Refresh token failed");
            return of(null);
          }

        }),
        catchError(error => {
          console.error("Refresh token failed", error);
          return of(null);
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
