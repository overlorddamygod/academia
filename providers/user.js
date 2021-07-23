import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import database from "@react-native-firebase/database";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { createContext, useContext, useEffect, useState } from "react";
import { showToast } from "../utils/error";
import { getFcmToken, requestUserPermission } from "../notifications";
import { ActivityIndicator, View } from "react-native";

const initialUser = {
  username: null,
  email: null,
};

const UserContext = createContext(initialUser);

const UserProvider = ({ SignedInScreen, SignedOutScreen }) => {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [intializing, setInitializing] = useState(true);

  const UserChange = async (u) => {
    const loggedUser = auth().currentUser;
    if (loggedUser) {
      try {
        let userSnapshot = await firestore()
          .collection("user")
          .doc(loggedUser.uid)
          .get();
        const userData = userSnapshot.data();

        setUser({ ...user, ...userData });

        if (intializing) setInitializing(false);

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

        if (requestUserPermission()) {
          const token = await getFcmToken();

          database()
            .ref(`/userDetails/${loggedUser.uid}/tokens`)
            .child(token)
            .set(true);
        }

        // Change online status
        const onlineStatusRef = database().ref(`/status/${loggedUser.uid}`);

        onlineStatusRef.set(true).then(() => console.log("ONLINE"));
        onlineStatusRef
          .onDisconnect()
          .remove()
          .then(() => console.log("OFFLINE"));
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
    messaging().subscribeToTopic("All");

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

  if (intializing)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#6765c2",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="white" size={"large"} />
      </View>
    );

  const register = async (username, email, password) => {
    if (!username || !email || !password) return;

    return fetch(
      "https://academiacollege.azurewebsites.net/api/signup?code=XatmuqcfTTFvHRhCLtHAWU6M1CFii1Jvtn8TH4hTmFOXTS3Ux85M0A%3D%3D",
      // "http://192.168.100.4:7071/api/signup",
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
      if (requestUserPermission()) {
        const token = await getFcmToken();

        database()
          .ref(`/userDetails/${auth().currentUser.uid}/tokens`)
          .child(token)
          .remove();
      }
      messaging().deleteToken();
      const token = await getFcmToken();

      messaging().subscribeToTopic("All");
      showToast("Logged out successfully");
      auth().signOut();
      GoogleSignin.signOut();
    } catch (err) {
      // console.error(err);
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
      GoogleSignin.signOut();
      showToast("Successfully linked your google account");
    } catch (err) {
      GoogleSignin.signOut();

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

  const fetchNotificationCount = () => {
    const onSnapshot = (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setNotificationCount(value);
      }
    };

    const notificationRef = database().ref(
      `userDetails/${user.id}/notification`
    );

    notificationRef.once("value", onSnapshot);
  };

  const clearNotificationCount = () => {
    if (notificationCount > 0) {
      database().ref(`userDetails/${user.id}`).update({
        notification: 0,
      });
      setNotificationCount(0);
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
        notificationCount,
        fetchNotificationCount,
        clearNotificationCount,
      }}
    >
      {user ? <SignedInScreen /> : <SignedOutScreen />}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, UserContext, useUserContext };
