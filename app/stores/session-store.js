import AppDispatcher from '../dispatcher';
import {createStore} from '../utils/store-utils';
import SessionConstants from '../constants/session-constants';
import AccountConstants from '../constants/account-constants';


let _authToken = sessionStorage.getItem('authToken');
let _email = sessionStorage.getItem('email');
let _errors = [];

const SessionStore = createStore({
    isLoggedIn() {
        return !!_authToken;
    },

    getAuthToken() {
        return _authToken;
    },

    getUserEmail() {
        return _email;
    },

    getErrors() {
        return _errors;
    }
});

// Action callbacks
const internals = {
    onLoginResponse(json, errors) {
        if (json && json.authToken) {
            _authToken = json.authToken;
            _email = json.email;
            sessionStorage.setItem('authToken', _authToken);
            sessionStorage.setItem('email', _email);
        }

        if (errors) {
            _errors = errors;
        }

        SessionStore.emitChange();
    },

    onLogout() {
        _authToken = null;
        _email = null;
        _errors = [];
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('email');

        SessionStore.emitChange();
    },

    onAccountCreated(json, errors) {
        this.onLoginResponse(json, errors);
    }
};


SessionStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;
    let json = action.json;
    let errors = action.errors;

    switch(action.type) {
        case SessionConstants.LOGIN_RESPONSE:
            internals.onLoginResponse(json, errors);
            break;

        case SessionConstants.LOGOUT:
            internals.onLogout();
            break;

        default: // do nothing
    }
});

export default SessionStore;