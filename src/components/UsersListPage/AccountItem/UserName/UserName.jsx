import React from "react"

export class UserName extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: ""
        }
    }

    componentDidMount() {
        this.setState(this.props)
    }

    render() {
        return(
            <div className="top-profile mr-2">
                <span>
                   {this.state.userName}
                </span>
            </div>
        )
    }
};