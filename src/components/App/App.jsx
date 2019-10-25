import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./../../constants/routes";

import { withAuthentication } from "./../Session";

import { Navigation } from "./../Navigation";
import { Footer } from "../Footer";

import { Landing } from "./../Landing";
import MainPage from "../MainPage"
import { SignUpPage } from "./../SignUp";
import { SignInPage } from "../SignIn";
import { PasswordForgetPage } from "../PasswordForget";
import AccountPage from "../Account";
import UsersListPage from "../UsersListPage";


const App = () => (
        <Router>
            <Navigation />

            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.MAIN_PAGE} component={MainPage} />
            <Route path={ROUTES.USERS_LIST_PAGE} component={UsersListPage} />

            <Footer />
        </Router>
);

export default withAuthentication(App);
