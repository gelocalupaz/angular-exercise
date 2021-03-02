import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    constructor (
        public router: Router,
        private authService: AuthService
    ) {}

    canActivate(): boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        if(!isLoggedIn) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}