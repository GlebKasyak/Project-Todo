import React from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../otherComponents/ErrorMessage";

import { withFirebase } from "../Firebase";
import * as ROUTES from "./../../constants/routes";

export const PasswordForgetPage = () => (
    <div className="forget-password page">
        <h1>Password Forgot Page</h1>
        <PasswordForgetForm />
    </div>
);


const INITIAL_STATE = {
    email: "",
    error: null
};

class PasswordForgetFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE})
            })
            .catch(error => {
                this.setState({error})
            });

        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const {email, error} = this.state;
        const isInvalid = email === "";

        return(
            <form onSubmit={this.onSubmit} className="fp-form col-6  offset-3 justify-content-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.onChange}
                        className="form-control"
                        aria-label="Email Address"

                    />
                    <div className="input-group-append">
                        <button disabled={isInvalid} type="submit" className="btn">
                            <span>Reset My Password</span>
                        </button>
                    </div>
                </div>

                {error && <ErrorMessage className="forget_password_error" message={error.message}/>}
            </form>
        )
    }
}


export const PasswordForgetLink =() => (
    <p className="link-to-forget-password">
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

