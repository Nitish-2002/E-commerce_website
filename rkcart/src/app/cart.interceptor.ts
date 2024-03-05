import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CartInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const AuthToken=localStorage.getItem("myToken");
    // console.log("hello "+AuthToken)
    if(AuthToken){
      const authReq=request.clone({
        setHeaders:{
          Authorization:`Bearer ${AuthToken}`
        }
      });
      return next.handle(authReq)
    }
    return next.handle(request);
  }
}
