import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access');

    if(access_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', "Bearer "+ access_token)
      });
      return next.handle(cloned);
    }
    else return next.handle(req);
  }
}
