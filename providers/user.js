import React, { createContext, useEffect, useContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import messaging from "@react-native-firebase/messaging";
import {requestUserPermission, getFcmToken} from "../notifications";

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
  const [user, setUser] = React.useState(initialUser);
  // const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function UserChange(u) {

      const loggedUser = auth().currentUser;
      if ( loggedUser ) {
        try {
          let userSnapshot = await firestore().collection("user").where("id","==", loggedUser.uid).limit(1).get()
          if ( userSnapshot.size > 0 ) {

            const userData = userSnapshot.docs[0].data()

            if (requestUserPermission()) {
              const token = await getFcmToken()
              userSnapshot.docs[0].ref.update({
                token
              })
            }
            
            setUser({...user,...userData});
            messaging().subscribeToTopic(`${userData.semester}_semester`)
            messaging().subscribeToTopic(`${userData.title}`)
          }
        }
        catch(err) {
          console.log("ERRORR",err)
        }

      } else {
        setUser(null)
      }
    }
    const unsubscribeAuth = auth().onAuthStateChanged(UserChange);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      if (remoteMessage.data.logout) {
        auth().signOut()
      }
    });

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (remoteMessage.data.logout) {
        auth().signOut()
      }
    });

    return ()=> {
      unsubscribeAuth()
      unsubscribeOnMessage()
    };
  }, []);

  const register = (username, email, password) => {
    if (!username || !email || !password) return;

    try {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        
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
    console.log("HERE",user)
    await firestore().collection("user").doc(user.id).update({
      token: null
    })
    auth().signOut();
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, UserContext, useUserContext };
