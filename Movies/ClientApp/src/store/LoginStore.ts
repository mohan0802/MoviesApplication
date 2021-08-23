import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface ILoginState {
    token: string;
}

interface LoginRequestAction {
    type: 'LOGIN_REQUEST';
}

interface LoginResponseAction {
    type: 'LOGIN_RESPONSE';
    token: string;
}

type KnownAction = LoginRequestAction | LoginResponseAction;

export const actionCreators = {

    login: (email: string, password: string, successCallback: () => void): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch('api/Login/GetLoginToken/' + email + '/' + password, {
            method: 'POST'
        })
            .then(response => response.json() as Promise<string>)
            .then(data => {
                sessionStorage.setItem("token", data);
                successCallback();
                dispatch({ type: 'LOGIN_RESPONSE', token: data });
            });

        dispatch({ type: 'LOGIN_REQUEST' });
    },
}

const initialState: ILoginState = { token: "" };

export const loginReducer: Reducer<ILoginState> = (state: ILoginState | undefined, incomingAction: Action): ILoginState => {
    if (state === undefined) {
        return initialState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                token: ""
            };
        case 'LOGIN_RESPONSE':
            return {
                token: action.token,
            };
        default:
            const exhaustiveCheck: never = action;
    }
    return state || initialState;
};