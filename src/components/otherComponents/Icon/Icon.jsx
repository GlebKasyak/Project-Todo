import React from "react";

export const Icon = (props) => (
    <div className="input-group-prepend">
        <div className="input-group-text">
            <i className={"fa fa-" + props.kind}></i>
        </div>
    </div>
);