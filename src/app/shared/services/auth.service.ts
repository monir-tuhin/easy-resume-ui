import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import {UserService} from './user.service';


@Injectable()
export class AuthService {
    headers = null;
    userInfo: any;
    localStorageData: any = {};

    constructor(public http: HttpClient, public userService: UserService) { }

    logIn(email: string, password: string) {
        // console.log(email, password);
        return this.http.post<any>(environment.apiUrl + 'auth', { email: email, password: password })
            .pipe(map(res => {
                console.log(res);
                // this.userService.setAppUserInfo(res);
               /* localStorage.setItem('authority', res.authority);
                localStorage.setItem('roles', res.roles);*/
                localStorage.setItem('userId', res.id);
                localStorage.setItem('accessToken', res.token);
                // this.userService.setUserId(res.id);

                return res;
            }));

    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
    }

  /*  logOut() {
        return this.http.post<any[]>(environment.apiUrl + '/account/logout', {}).pipe(
            map(res => {
                console.log(res);
            })
        );
    }*/

    getToken(): any {
        if (localStorage.getItem('accessToken')) {
            return localStorage.getItem('accessToken');
        } else {
            return '';
        }
    }

    getUserDetails() {
        return this.userInfo;
    }

    getUserInfo() {
        console.log('calling getUserInfo');
        return this.http.get<any[]>(environment.apiUrl + '/account/userInfo').pipe(
            map(res => {
                console.log('UserInfo: ' + res['data']);
            })
        );
    }


    getHeadersWithAccessToken(): HttpHeaders {
        this.headers = new HttpHeaders()
            .append('Authorization', 'Bearer ' + this.getToken());
        return this.headers;
    }



}
