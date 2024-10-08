import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return loginService.refreshAccessToken().pipe(
          switchMap(newToken => {
            if (newToken != null && newToken != "") {
              const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem("AccessToken"))
              });
              return next(clonedReq);
            } else {
              alert("Session het han");
              router.navigate(['/login']);
              return throwError(() => error);
            }
          })
        );
      } else {
        // If the error is not 401, re-throw the error
        return throwError(() => error);
      }
    })
  );
};
