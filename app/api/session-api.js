import AppDispatcher from '../dispatcher';
import SessionServerActions from '../actions/session-server-actions';
import request from 'axios';


// root uri of your authentication api
const API_ROOT = "";

const SessionAPI = {

    login(email, password) {
        request.post(API_ROOT + '/account/login', {
            email: email,
            password: password
        }).then((resp) =>
            SessionActions.sendLoginResponse(resp, null);
        .catch(err) {
            SessionActions.sendLoginResponse(null, err);
        }
    }
};

export default SessionAPI;