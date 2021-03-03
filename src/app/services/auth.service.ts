import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    testUser: User = { username: 'user@gmail.com', password: '123456', token: 'testToken' };

    constructor() { }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        const token = this.getToken();
        // console.log("this token: " + token);
        return token;
    }

    login(username: string, password: string): Observable<any> {
        return new Observable((result) => {
            if (username === this.testUser.username && password === this.testUser.password) {
                result.next({ username: this.testUser.username, token: this.testUser.token });
            } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username) && (password.length > 5 && password.length <= 20)) {
                result.next({ username: username, token: this.testUser.token });
            } else {
                result.error({ error: 'invalid user' });
            }
            result.complete();
        });
    }
}