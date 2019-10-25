import React from "react";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { Icon } from "../otherComponents/Icon/Icon";
import { ErrorMessage } from "../otherComponents/ErrorMessage";

export const SignUpPage = () => (
    <div className="sign-up page">
        <h1>Sigh up Page</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
};

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }


    onSubmit = (event) => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.MAIN_PAGE)
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
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            username === "" ||
            email === "";

        return(
            <form onSubmit={this.onSubmit} className="sign-up-form" >
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="inputUser4">Username</label>
                        <div className="input-group">
                            <Icon kind="user"/>
                            <input
                                value={username}
                                onChange={this.onChange}
                                name="username"
                                type="text"
                                placeholder="Full Name"
                                className="form-control"
                                id="inputUser4"
                            />
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="form-group col">
                        <label htmlFor="inputEmail4">Email</label>
                        <div className="input-group">
                            <Icon kind="at"/>
                            <input
                                value={email}
                                onChange={this.onChange}
                                name="email"
                                type="text"
                                placeholder="Email Address"
                                className="form-control"
                                id="inputEmail4"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-auto">
                        <label htmlFor="inputPassword">Password</label>
                        <div className="input-group">
                            <Icon kind="lock"/>
                            <input
                                value={passwordOne}
                                onChange={this.onChange}
                                name="passwordOne"
                                type="Password"
                                placeholder="Password"
                                className="form-control"
                                id="inputPassword"
                            />
                        </div>
                    </div>
                    <div className="form-group col-auto">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <div className="input-group">
                            <Icon kind="lock"/>
                            <input
                                value={passwordTwo}
                                onChange={this.onChange}
                                name="passwordTwo"
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control"
                                id="inputPassword2"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={isInvalid} className="btn btn-primary col-2">Sign Up 🔥🔥🔥</button>

                {error && <ErrorMessage className="signup_error" message={error.message}/>}
            </form>

        )
    }
}


export const SignUpForm = compose (
    withRouter ,
    withFirebase ,
)( SignUpFormBase );

export const SignUpLink = () => (
    <p className="link-to-signUp">
        Don't have an account?
            <Link to={ROUTES.SIGN_UP}>
                <span>
                    Sign Up
                </span>
            </Link>
    </p>
);