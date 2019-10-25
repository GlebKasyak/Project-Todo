import React from "react";

import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';
import { withAuthorization, AuthUserContext } from "../Session";

const AccountPage = () => (

    <AuthUserContext.Consumer>
        {authUser => (
            <div className="account-page page">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Account Page</h1>
                        <p className="user-email">Account: <span>{authUser.email}</span></p>
                    </div>
                    <div className="col-12 forms">
                        <PasswordForgetForm />

                        <div className="or col-8 offset-2">Or</div>

                        <div className="col-6 offset-3">
                            <PasswordChangeForm />
                        </div>
                    </div>
                </div>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);