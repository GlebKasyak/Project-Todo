import React from "react";
import { compose } from "recompose";
import * as ROUTES from "./../../constants/routes";
import { Icon } from "../otherComponents/Icon/Icon";
import { ErrorMessage } from "../otherComponents/ErrorMessage";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { PasswordForgetLink } from "../PasswordForget";

export const SignInPage = () => (
    <div className="sign-in page">
        <h1>Sign In Page</h1>
        <SignInForm />
        <div className="row justify-content-center registration">
            <div className="col-4 ">
                <PasswordForgetLink />
                <SignUpLink />
            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    password: "",
    email: "",
    error: null
};

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.MAIN_PAGE);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            password,
            email,
            error
        } = this.state;

        const isInvalid =
            password === "" || email === "";

        return(
            <form onSubmit={this.onSubmit} className="sign-in-form">
                <div className="form row align-items-center">
                    <div className="offset-4 col-4 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Имя пользователя</label>
                        <div className="input-group">
                            <Icon kind="at"/>
                            <input
                                value={email}
                                onChange={this.onChange}
                                name="email"
                                type="text"
                                placeholder="Email Address"
                                className="form-control"
                                id="inlineFormInputGroupUsername"
                            />
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="offset-4 col-4 my-1">
                        <label className="sr-only " htmlFor="inlineFormInputName">Name</label>
                        <div className="input-group">
                            <Icon kind="lock"/>
                            <input
                            value={password}
                            onChange={this.onChange}
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            id="inlineFormInputName"
                        />
                        </div>
                    </div>
                    <div className="offset-5 col-3 my-1 btn-submit">
                        <button type="submit" className="btn" disabled={isInvalid}>Sign In</button>
                    </div>
                </div>

                {error && <ErrorMessage className="signin_error" message={error.message}/>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
) (SignInFormBase);

