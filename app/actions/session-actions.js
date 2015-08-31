import AppDispatcher from '../dispatcher';
import SessionConstants from '../constants/session-constants';
import SessionAPI from '../api/session-api';


const SessionActions = {

    login(email, password) {
        AppDispatcher.handleViewAction({
            type: SessionConstants.LOGIN_REQUEST,
            email: email,
            password: password
        });
        SessionAPI.login(email, password);
    },

    logout() {
        AppDispatcher.handleViewAction({
            type: SessionConstants.LOGOUT
        });
    }
};

export default SessionActions;