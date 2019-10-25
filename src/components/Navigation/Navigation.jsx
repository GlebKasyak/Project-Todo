import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "./../../constants/routes";
import SignOutButton from "./../SignOut";

import { AuthUserContext } from "./../Session";
import  AccountItem  from "./../UsersListPage/AccountItem";

export const Navigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
        <a className="navbar-brand logo" href={ROUTES.LANDING}>
            <img src="./images/logo.jpg" alt="todo-logo"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <>
                <AuthUserContext.Consumer>
                    {authUser =>
                        authUser ? <NavigationAuth {...authUser}/> : <NavigationNonAuth />
                    }
                </AuthUserContext.Consumer>
            </>
        </div>
    </nav>
);

const NavigationAuth = (props) => {

    return(
        <>
            <ul className="navbar-nav auth">
                <li>
                    <Link to={ROUTES.LANDING} className="nav-item active langing">Landing Page</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT} className="nav-item account">Account Page</Link>
                </li>
                <li>
                    <Link to={ROUTES.MAIN_PAGE} className="nav-item main-page">Main Page</Link>
                </li>
                <li>
                    <Link to={ROUTES.USERS_LIST_PAGE} className="nav-item users-list-page">Users List Page</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
                <li>
                    <AccountItem {...props}/>
                </li>
            </ul>
        </>
    )
};

const NavigationNonAuth = () => (
    <ul className="navbar-nav no-auth justify-content-end">
        <li>
            <Link to={ROUTES.LANDING}>Landing Page</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);
