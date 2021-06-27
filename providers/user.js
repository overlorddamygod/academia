import React, { createContext, useEffect, useContext, useState } from "react";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import messaging from "@react-native-firebase/messaging";
import {requestUserPermission, getFcmToken} from "../notifications";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '1048000501046-9ubq5o872gsbsut6am9vcndrr6s6dv47.apps.googleusercontent.com',
});
const initialUser = {
  username: null,
  email: null,
};

const ROLE = {
  NORMAL: 1,
  ADMIN: 2,
}

const TITLE = {
  STUDENT: "Student",
  TEACHER: "Teacher"
}

const UserContext = createContext(initialUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (username, email, password) => {
    if (!username || !email || !password) return;

    try {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("CREATED")
        result.user
          .updateProfile({
            displayName: username,
          })
          .then((r) => {
            const { uid, email } = result.user

            const userData = {
              id: uid,
              email,
              username: username,
              title: TITLE.STUDENT,
              semester: 3,
              role: ROLE.NORMAL,
              createdAt: firestore.FieldValue.serverTimestamp()
            };
            
            firestore().collection("user").doc(`${uid}`).set(userData).then(_r => {
              setUser({...user,...userData});

              return true
            }).catch(err=> {
              return err
            })
          });
        
      })
      .catch((error) => {
        return error
      });
    } catch (err) {
      return err
    }
    
  };

  const login = async ( email, password ) => {
    return auth().signInWithEmailAndPassword(email, password)
  }

  const logout = async () => {
    messaging().deleteToken()
    await firestore().collection("user").doc(user.id).update({
      token: null
    })
    auth().signOut();
  }

  const linkWithGoogle = async () => {
    // console.log("SAD")
    // var googleProvider =  new auth.GoogleAuthProvider();
    // auth().currentUser.linkWithPopup(googleProvider).then((result) => {
    //   // Accounts successfully linked.
    //   var credential = result.credential;
    //   var user = result.user;
    //   console.log("CREDENTIAL", credential)
    //   console.log("USER", result.user)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   // ...
    // });
    const { idToken } = await GoogleSignin.signIn();
    let credential = auth.GoogleAuthProvider.credential(idToken);

    auth().currentUser.linkWithCredential(credential)
    console.log(idToken)
  }
  const loginWithGoogle = async () => {
    // var googleProvider =  auth.GoogleAuthProvider();
    // auth().signInWithCredential()
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout, setUser: setUser, linkWithGoogle,loginWithGoogle}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, UserContext, useUserContext };
