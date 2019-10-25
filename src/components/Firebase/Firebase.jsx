import app from "firebase/app";
import "firebase/auth"
import { firebaseConfig } from "./firebaseConfig.js";

import 'firebase/firestore';


export class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.firestore();

        this.fieldValue = app.firestore.FieldValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    getAuthStateChanged = authUser => this.auth.onAuthStateChanged(authUser);

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);


    user = uid => this.db.doc(`users/${uid}`);

    users = () => this.db.collection('users');

}