import AppDispatcher from '../dispatcher';
import AccountActions from '../actions/account-actions';
import request from 'axios';


// adjust paths appropriately
const API_ROOT = "";
const AccountAPI = {
    createAccount(email, username, password) {
        request.post(API_ROOT + '/account/signup', {
            email: email,
            username: username,
            password: password
        }).then((resp) => {
            AccountActions.sendCreateAccountResponse(resp, null);
        }).catch((err) => {
            AccountActions.sendCreateAccountResponse(null, err);
        });
    }
};

export default AccountAPI;