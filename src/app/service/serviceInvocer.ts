import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceInvoker {

  apiUrl : string = 'http://localhost:8009/api/';
  constructor(private http: HttpClient) { }

  get(request: any, url: string): Observable<any>{
    if(request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.UserRole = localStorage.getItem("RoleId");
    request.Token = localStorage.getItem("Token");

    const httpPackage = {
      params: request
    }

    return this.http.get(this.apiUrl+url, httpPackage);
  }

  post(request: any, url:string ) : Observable<any>
  {
    if(request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.Token = localStorage.getItem("Token");

    const httpPackage = request

    return this.http.post(this.apiUrl + url, httpPackage);
  }

  put(request: any, url:string ) : Observable<any>
  {
    if(request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.Token = localStorage.getItem("Token");

    const httpPackage = request

    return this.http.put(this.apiUrl+url, httpPackage);
  }

  delete(request: any, url:string ) : Observable<any>
  {
    if(request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.UserRole = localStorage.getItem("RoleId");
    request.Token = localStorage.getItem("Token");

    const httpPackage = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: request
    };

    return this.http.delete(this.apiUrl + url, httpPackage);
  }

}
