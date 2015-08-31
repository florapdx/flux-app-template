import React from 'react';
import _ from 'lodash';
import {RouteHandler} from 'react-router';
import {Button, Input} from 'react-bootstrap';

import AccountActions from '../../actions/account-actions';
import AccountStore from '../../stores/account-store';

const INPUT_FIELDS = [
    {field: "email", title: "Email", placeholder: "Your email"},
    {field: "username", title: "Username", placeholder: "Your username"},
    {field: "password", title: "Account password", placeholder: "Password"},
    {field: "confirm", title: "Confirm password", placeholder: "Retype password"}
];

const MIN_PWD_LENGTH = 8;
const MAX_PWD_LENGTH = 32;

const Signup = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            email: '',
            username: '',
            password: '',
            confirm: '',
            isInvalid: false,
            invalidFields: [],
            disableSubmit: true
        };
    },

    componentDidMount() {
        AccountStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AccountStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        if (AccountStore.getErrors().length) {
            // show error message
        } else if (AccountStore.hasActiveAccount()) {
            this.context.router.transitionTo('home');
        } else {
            this.clearForm();
        }
    },

    clearForm() {
        this.setState(this.getInitialState());
    },

    handleInputChange(field, event) {
        let $target = event.target;
        let value = $target.value;
        let invalids = _.without(this.state.invalidFields, field);

        this.setState({
            [field]: value,
            invalidFields: invalids,
            disableSubmit: field === 'confirm' ? false : true
        });
    },

    validate(fields) {
        let errors = [];

        // Could find a lib to handle this...
        let isEmail = /[@.]/g.test(fields.email);

        let hasUppercaseLetter = /[A-Z]+/g.test(fields.password);
        let hasLowercaseLetter = /[a-z]+/g.test(fields.password);
        let hasNumber = /[\d]/g.test(fields.password);
        let pwdLength = fields.password.length;

        let passwordMatch = fields.password === fields.confirm;

        if (!fields.email.length || !isEmail) {
            errors.push("email");
        }

        if (!fields.username.length) {
            errors.push("username");
        }

        if (pwdLength < MIN_PWD_LENGTH ||
            pwdLength > MAX_PWD_LENGTH ||
            !hasUppercaseLetter ||
            !hasLowercaseLetter ||
            !hasNumber) {
            errors.push("password");
        }

        if (!passwordMatch) {
            errors.push("confirm");
        }

        return errors;
    },

    handleFormSubmit(event) {
        let email = this.state.email;
        let username = this.state.username;
        let password = this.state.password;

        let validationErrors = this.validate({
            email: email,
            username: username,
            password: password,
            confirm: this.state.confirm
        });

        if (!validationErrors.length) {
            AccountActions.createAccount(email, username, password);
        } else {
            this.setState({
                invalidFields: validationErrors,
                disableSubmit: true
            });
        }
    },

    render() {
        let disabled = this.state.disableSubmit;
        let errors = this.state.invalidFields;

        let formFields = _.map(INPUT_FIELDS, (field, idx) => {
            let fieldName = field.field;
            let classes = fieldName;
            if (_.contains(errors, field.field)) {
                classes += " invalid";
            }

            return (
                <Input
                    type="text"
                    label={field.title}
                    placeholder={field.placeholder}
                    className={classes}
                    key={idx}
                    ref={fieldName}
                    value={this.state[field.title]}
                    onChange={_.partial(this.handleInputChange, fieldName)}
                />
            );
        }, this);

        return (
            <div className="signup">
                <div className="signup__wrapper">
                    <h2>Welcome to our app! Sign up below.</h2>
                    <p className="signup__password-hint"><span className="asterisk">&#42; </span>Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.</p>
                    <form role="form" className="form-inline">
                        {formFields}
                    </form>
                    <Button bsStyle="primary" type="button" ref="submit" onClick={this.handleFormSubmit} disabled={disabled}>Continue</Button>
                </div>
                <RouteHandler />
            </div>
        );
    }
});

export default Signup;