import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { createContext, useContext, useEffect, useState } from "react";
import { showToast } from "../utils/error";
import {getFcmToken} from "../notifications";

const initialUser = {
  username: null,
  email: null,
};

const ROLE = {
  NORMAL: 1,
  ADMIN: 2,
};


const TITLE = {
  STUDENT: "Student",
  TEACHER: "Teacher",
};

const UserContext = createContext(initialUser);

const UserProvider = ({ SignedInScreen, SignedOutScreen }) => {
  const [user, setUser] = useState(null);
  const [intializing, setInitializing] = useState(true);

  const UserChange = async (u) => {
    // auth().signOut()
    const loggedUser = auth().currentUser;
    if (loggedUser) {
      try {
        setUser(loggedUser);
        if (intializing) setInitializing(false);

        let userSnapshot = await firestore()
          .collection("user")
          .doc(loggedUser.uid)
          .get();
        const userData = userSnapshot.data();

        // if (requestUserPermission()) {
        //   const token = await getFcmToken()
        //   userSnapshot.docs[0].ref.update({
        //     token
        //   })
        // }

        setUser({ ...user, ...userData });
        messaging().subscribeToTopic("All");
        messaging().subscribeToTopic(`${userData.title}`);

        if (userData.faculty && userData.semester) {
          messaging().subscribeToTopic(
            `${userData.faculty.split(" ").join("_")}`
          );
          messaging().subscribeToTopic(
            `${userData.faculty.split(" ").join("_")}_${userData.semester}`
          );
        }

        // Change online status
        // const onlineStatusRef = database().ref(`/status/${loggedUser.uid}`);

        // onlineStatusRef.set(true).then(() => console.log("ONLINE"));
        // onlineStatusRef
        //   .onDisconnect()
        //   .remove()
        //   .then(() => console.log("OFFLINE"));
      } catch (err) {
        console.log("ERRORR", err);
        setUser(null);
      }
    }
    if (!loggedUser) {
      setUser(null);
    }
    setInitializing(false);
  };

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(UserChange);
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      if (remoteMessage.data.logout) {
        auth().signOut();
      }
    });

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
        if (remoteMessage.data.logout) {
          auth().signOut();
        }
      }
    );

    GoogleSignin.configure({
      webClientId:
        "1048000501046-9ubq5o872gsbsut6am9vcndrr6s6dv47.apps.googleusercontent.com",
    });

    return () => {
      unsubscribeAuth();
      unsubscribeOnMessage();
    };
  }, []);

  if (intializing) return null;

  const register = async (username, email, password) => {
    if (!username || !email || !password) return;

    return fetch(
      "https://academiacollege.azurewebsites.net/api/signup?code=XatmuqcfTTFvHRhCLtHAWU6M1CFii1Jvtn8TH4hTmFOXTS3Ux85M0A%3D%3D",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );
  };

  const login = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    try {
      messaging().deleteToken();
      const token = await getFcmToken();
      console.log("TOKEN", token);
      messaging().subscribeToTopic("All");

      messaging().subscribeToTopic("All");
      await firestore().collection("user").doc(user.id).update({
        token: null,
      });
      auth().signOut();
      GoogleSignin.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const linkWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user: googleUser } = await GoogleSignin.signIn();
      let credential = auth.GoogleAuthProvider.credential(idToken);

      await auth().currentUser.linkWithCredential(credential);

      await firestore().collection("user").doc(auth().currentUser.uid).update({
        googleId: googleUser.id,
      });
      showToast("Successfully linked your google account");
    } catch (err) {
      console.error(err);
      if (err.code == "auth/unknown") showToast("User has already been linked");
      else {
        showToast("Error linking your google account");
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user: googleUser } = await GoogleSignin.signIn();

      const snapshot = await firestore()
        .collection("user")
        .where("googleId", "==", googleUser.id)
        .get();
      if (snapshot.size > 0) {
        let credential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(credential);
        showToast("Successfully signed in");
      } else {
        showToast("Given gmail account is not linked to any account.");
        GoogleSignin.signOut();
      }
    } catch (err) {
      showToast("Error signing in");
      GoogleSignin.signOut();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        setUser: setUser,
        linkWithGoogle,
        loginWithGoogle,
      }}
    >
      {user ? <SignedInScreen /> : <SignedOutScreen />}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, UserContext, useUserContext };
