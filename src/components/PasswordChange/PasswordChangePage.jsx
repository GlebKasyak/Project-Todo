import React from "react";

import { withFirebase } from "../Firebase";
import { Icon } from "../otherComponents/Icon/Icon";
import { ErrorMessage } from "../otherComponents/ErrorMessage";

const INITIAL_STATE = {
    passwordOne: "",
    passwordTwo: "",
    error: null
};

class PasswordChangeFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
      const {passwordOne, passwordTwo} = this.state;

      this.props.firebase
          .doPasswordUpdate(passwordOne, passwordTwo)
          .then(() => {
              this.setState({...INITIAL_STATE})
          })
          .catch(error => {
              this.setState({error})
          });

      event.preventDefault()
    };

    onChange = (event) => {
       this.setState({[event.target.name]: event.target.value})
    };

    render() {

        const {passwordOne, passwordTwo, error} = this.state;
        const isInvalid =
            passwordOne === "" || passwordOne !== passwordTwo;

        return(
            <form onSubmit={this.onSubmit} className="corm-password-change">
                <div className="form row align-items-center">
                    <div className="col-6 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputGroupPasswordOne">Имя пользователя</label>
                        <div className="input-group">
                            <Icon kind="lock"/>
                            <input
                                type="password"
                                name="passwordOne"
                                placeholder="New Password"
                                value={passwordOne}
                                onChange={this.onChange}
                                className="form-control"
                                id="inlineFormInputGroupPasswordOne"
                            />
                        </div>
                    </div>
                    <div className="col-6 my-1">
                        <label className="sr-only " htmlFor="inlineFormInputPasswordTwo">Name</label>
                        <div className="input-group">
                            <Icon kind="lock"/>
                            <input
                                type="password"
                                name="passwordTwo"
                                placeholder="Confirm New Password"
                                value={passwordTwo}
                                onChange={this.onChange}
                                className="form-control"
                                id="inlineFormInputPasswordTwo"
                            />
                        </div>
                    </div>
                    <div className="col-12 btn-submit justify-content-center d-flex">
                        <button type="submit" className="btn" disabled={isInvalid}>
                            Change My Password
                        </button>
                    </div>
                </div>
                {error && <ErrorMessage className="error_change_password" message={error.message}/>}
            </form>
        )
    }

}

export const PasswordChangeForm = withFirebase(PasswordChangeFormBase);