import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({firebase}) => (
    <div className="sign-out">
        <button type="button" className="btn btn-white btn-animation-1" onClick={firebase.doSignOut}>
            Sign Out
        </button>
    </div>
);

export default withFirebase(SignOutButton);
