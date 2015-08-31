import AppDispatcher from '../dispatcher';
import AccountConstants from '../constants/account-constants';
import AccountAPI from '../api/account-api';


const AccountActions = {

    createAccount(email, username, password) {
        AppDispatcher.handleViewAction({
           type: AccountConstants.CREATE_ACCOUNT_REQUEST,
           email: email,
           username: username,
           password: password
        });
        AccountAPI.createAccount(email, username, password);
    }
};

export default AccountActions;