import React from "react";

import { withAuthorization } from "../Session";

const MainPage = () => (
    <div className="main page">
        <h1>Main Page</h1>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MainPage);