import React from "react";

import { withFirebase } from "../Firebase";
import { LoadingDot } from "./../otherComponents/Loading";

class UsersListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            users: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.unsubscribe = this.props.firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];
                snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid: doc.id }),
                );
                this.setState({
                    users,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const { users, loading } = this.state;

        return (
            <div className="user-list-page page">
                {loading && <div><div className="loading-animation col-6 offset-3"><LoadingDot /></div></div>}
                <UserList users={users} />
            </div>
        );
    }
}

const UserList = ({ users }) => (
    <div>
        <div className="overlay">
            <h1>List of users</h1>
            <ul className="row user-list">
                {users.map(user => (
                    <li key={user.uid} className="col-8">
                        <p>
                            <strong>ID:</strong>
                            <span>{user.uid}</span>
                        </p>
                        <p>
                            <strong>E-Mail:</strong>
                            <span>{user.email}</span>
                        </p>
                        <p>
                            <strong>Username:</strong>
                            <span>{user.username}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default withFirebase(UsersListPage);
