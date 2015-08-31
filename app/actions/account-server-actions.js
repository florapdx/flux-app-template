import AppDispatcher from '../dispatcher';
import AccountConstants from '../constants/account-constants';


const AccountServerActions = {

    sendCreateAccountResponse(json, errors) {
        AppDispatcher.handleServerAction({
            type: AccountConstants.CREATE_ACCOUNT_RESPONSE,
            json: json,
            errors: errors
        });
    }
};

export default AccountServerActions;