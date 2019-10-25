import React from "react";

export const LoadingDot = () => (

    <div className="gooey">
        <span className="dot">

        </span>
        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

export const SpinnerLoading =() => (
    <div className="spinner-border m-5" role="status">
        <span className="sr-only">Loading...</span>
    </div>
);



