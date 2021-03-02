import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, Login, LoginSuccess, LoginFailed, Logout, AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    Login: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: Login) => action.payload),
        switchMap((payload) => {
        return this.authService.login(payload.username, payload.password)
            .pipe(
                map((user) => {
                    // console.log("success:" + user);
                    return new LoginSuccess({token: user.token, username: payload.username});
                }),
                catchError((error) => {
                    return of(new LoginFailed({ error: error }));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            //if success, save to localStorage token and username
            localStorage.setItem('token', user.payload.token);
            localStorage.setItem('username', user.payload.username);
            // console.log('went here');
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    LoginFailed: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILED)
    );

    @Effect({ dispatch: false })
    public Logout: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.router.navigateByUrl('/login');
        })
    );
        
}