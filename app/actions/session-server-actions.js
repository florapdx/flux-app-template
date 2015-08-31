import AppDispatcher from '../dispatcher';
import SessionConstants from '../constants/session-constants';


const SessionServerActions = {

    sendLoginResponse(json, errors) {
        AppDispatcher.handleServerAction({
            type: SessionConstants.LOGIN_RESPONSE,
            json: json,
            errors: errors
        });
    }
};

export default SessionServerActions;