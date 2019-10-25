import React from "react";

import { withFirebase } from "./../Firebase";
import { AuthUserContext } from './context';

export const withAuthentication = Component => {
   class  WithAuthentication extends React.Component {
       constructor(props) {
           super(props);

           this.state = {
             authUser: null
           };
       }

       componentDidMount() {
           this.listener = this.props.firebase
               .getAuthStateChanged(authUser => {
                   authUser
                       ? this.setState({authUser})
                       : this.setState({authUser: null})
               })
       }

       componentWillUnmount() {
           this.listener();
       }

       render() {
           return (
               <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} authUser={this.state.authUser}/>
               </AuthUserContext.Provider>
           )
       }
   }

   return withFirebase(WithAuthentication);

};