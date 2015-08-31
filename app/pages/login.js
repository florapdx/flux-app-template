import React from 'react';
import _ from 'lodash';
import {RouteHandler, Link} from 'react-router';
import {Button, Input} from 'react-bootstrap';


const INPUT_FIELDS = [
    {field: "email", title: "Email", placeholder: "Your email"},
    {field: "password", title: "Account password", placeholder: "Password"}
];

const MIN_PWD_LENGTH = 8;
const MAX_PWD_LENGTH = 32;

const Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            email: '',
            password: '',
            isInvalid: false,
            invalidFields: []
        };
    },

    componentDidMount() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        if (SessionStore.getErrors().length) {
            // show error states and error message
        } else if (SessionStore.isLoggedIn()) {
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
            invalidFields: invalids
        });
    },

    validate(fields) {
        let errors = [];

        let isEmail = /[@.]/g.test(fields.email);

        let hasUppercaseLetter = /[A-Z]+/g.test(fields.password);
        let hasLowercaseLetter = /[a-z]+/g.test(fields.password);
        let hasNumber = /[\d]/g.test(fields.password);
        let pwdLength = fields.password.length;

        if (!fields.email.length || !isEmail) {
            errors.push("email");
        }

        if (pwdLength < MIN_PWD_LENGTH ||
            pwdLength > MAX_PWD_LENGTH ||
            !hasUppercaseLetter ||
            !hasLowercaseLetter ||
            !hasNumber) {
            errors.push("password");
        }

        return errors;
    },

    handleFormSubmit(event) {
        let email = this.state.email;
        let password = this.state.password;

        let validationErrors = this.validate({
            email: email,
            password: password
        });

        if (!validationErrors.length) {
            SessionActions.login(email, password);
        } else {
            this.setState({
                invalidFields: validationErrors
            });
        }
    },

    render() {
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
            <div className="login">
                <div className="login__wrapper">
                    <h2>Please login below.</h2>
                    <form role="form" className="form-inline">
                        {formFields}
                    </form>
                    <Button bsStyle="primary" type="button" ref="submit" onClick={this.handleFormSubmit}>Log in</Button>
                </div>
                <p>Don't have an account? Sign up for an account <Link to="signup">here</Link>.</p>
                <RouteHandler />
            </div>
        );
    }
});

export default Login;