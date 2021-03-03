import { Login, LoginSuccess, LoginFailed, Logout, AuthActions, AuthActionTypes } from '../actions/auth.actions';
import * as Reducer from './auth.reducer';
import { User } from './../../models/user.model';

describe('Auth Reducer', () => {
    describe('unknown action', () => {
        it('should return default state', () => {
            const { initialState } = Reducer;
            const action = {
                type: 'Unknown',
            } as any;
            const state = Reducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('LoginSuccess action', () => {
        it('login success', () => {
            const { initialState } = Reducer;
            const newState: User = {
                token: 'testToken',
                username: 'user@email.com'
            };
            const action = new LoginSuccess({ newState });
            const state = Reducer.reducer(initialState, action);
            // console.log('state: ' + JSON.stringify(state));
            // console.log('newState: ' + JSON.stringify(newState));
            expect(state.isValid).toBe(true)
            expect(state.errorMessage).toBe(null);
        });
    });

    describe('LoginFailed action', () => {
        it('login failed', () => {
            const { initialState } = Reducer;
            const error ={
                error: 'error'
            };
            const action = new LoginFailed({ error });
            const state = Reducer.reducer(initialState, action);
            // console.log('state: ' + JSON.stringify(state));
            // console.log('newState: ' + JSON.stringify(newState));
            expect(state.isValid).toBe(false)
            expect(state.errorMessage).toBe("Incorrect user credentials");
        });
    });

    describe('Logout action', () => {
        it('logout', () => {
            const { initialState } = Reducer;
            // const error ={
            //     error: 'error'
            // };
            const action = new Logout();
            const state = Reducer.reducer(initialState, action);
            // console.log('state: ' + JSON.stringify(state));
            // console.log('newState: ' + JSON.stringify(newState));
            expect(state.isValid).toBe(false)
            expect(state.errorMessage).toBe(null);
        });
    });
});