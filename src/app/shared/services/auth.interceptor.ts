import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let accessToken = this.auth.getToken();
       // console.log(this.auth.getToken());

      // for file upload
      const ignore =
        typeof request.body === 'undefined'
        || request.body === null
        || request.body.toString() === '[object FormData]' // <-- This solves your problem
        || request.headers.has('Content-Type');

      if (!ignore) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + this.auth.getToken(),
            'Authorization': this.auth.getToken()
          }
        });
        return next.handle(request);

      } else {
        request = request.clone({
          setHeaders: {
            'Authorization': this.auth.getToken()
          }
        });
        return next.handle(request);
      }

      /*request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + this.auth.getToken(),
          'Authorization': this.auth.getToken()
        }
      });
      return next.handle(request);*/




      /*  request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.auth.getToken(),
                'Authorization': this.auth.getToken()
            }
        });

        return next.handle(request);*/
    }
}
