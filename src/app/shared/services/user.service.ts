import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userId: any;

    constructor() { }

    getUserId(): any {
        return this.userId;
    }
    setUserId(userId: any) {
        this.userId = userId;
    }




}
