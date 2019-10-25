import React from "react";
import { withFirebase } from "../../Firebase";
import { SpinnerLoading } from "../../otherComponents/Loading";
import { UserName } from "./UserName";

class AccountItem  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            userName: ""
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.user = this.props.firebase
            .user(this.props.uid)
            .onSnapshot(snapshot => {
                let userName;
                userName = snapshot.data().username;

                this.setState({
                    userName,
                    loading: false
                })
            });

    }

    componentWillUnmount() {
        this.user();
    }

    render(){

        const { isLoading, userName } = this.state;

        return(
            <div className="userName">
                {isLoading && <SpinnerLoading />}
                {userName && <UserName userName={userName}/>}
            </div>
        )
    }
}

export default withFirebase(AccountItem);