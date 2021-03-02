import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILED = '[Auth] Login Failed',
    LOGOUT = '[Auth] Logout',
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    
    constructor(public payload: any) {}
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;
    
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = Login | LoginSuccess | LoginFailed | Logout;