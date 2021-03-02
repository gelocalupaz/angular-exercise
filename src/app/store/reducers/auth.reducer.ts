import { User } from '../../models/user.model';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';

export interface State {
    isValid: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isValid: localStorage.getItem('token') !== null,
    user: {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    },
    errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
    switch(action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isValid: true,
                user: {
                    token: action.payload.token,
                    username: action.payload.username
                },
                errorMessage: null
            }
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                isValid: false,
                errorMessage: 'Incorrect user credentials'
            }
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}