import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceInvoker {

  apiUrl : string = 'http://localhost:8009/api/';
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem("AccessToken");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
    });
  }

  get(request: any, url: string): Observable<any> {
    if (request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.UserRole = localStorage.getItem("RoleId");

    const httpPackage = {
      params: request,
      headers: this.getAuthHeaders()
    };

    return this.http.get(this.apiUrl + url, httpPackage);
  }

  post(request: any, url: string): Observable<any> {
    if (request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");

    const httpPackage = request;

    const httpHeaders = {
      headers: this.getAuthHeaders()
    };

    return this.http.post(this.apiUrl + url, httpPackage, httpHeaders);
  }

  put(request: any, url: string): Observable<any> {
    if (request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");

    const httpPackage = request;

    const httpHeaders = {
      headers: this.getAuthHeaders()
    };
    return this.http.put(this.apiUrl + url, httpPackage, httpHeaders);
  }

  delete(request: any, url: string): Observable<any> {
    if (request == undefined || request == "") request = {};

    request.currUserId = localStorage.getItem("UserId");
    request.currUserName = localStorage.getItem("Username");
    request.UserRole = localStorage.getItem("RoleId");

    const httpPackage = {
      headers: this.getAuthHeaders(),
      body: request
    };

    return this.http.delete(this.apiUrl + url, httpPackage);
  }
}
