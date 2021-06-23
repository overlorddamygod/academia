import React, { createContext, useEffect, useContext } from "react";
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

  useEffect(() => {
    async function UserChange(user) {
      const loggedUser = auth().currentUser;
      if ( loggedUser ) {
        try {
          let userData = await firestore().collection("user").where("id","==", loggedUser.uid).limit(1).get()
          if ( userData.docs.length > 0) {

            if (requestUserPermission()) {
              const token = await getFcmToken()
              userData.docs[0].ref.update({
                token
              })
            }
            userData = userData.docs[0].data()
            setUser({...user,...userData});
            messaging().subscribeToTopic(`${userData.semester}_semester`)
            messaging().subscribeToTopic(`${userData.title}`)


          }
        }
        catch(err) {
          console.log(err)
        }

      } else {
        setUser(null)
      }
    }
    const subscriber = auth().onAuthStateChanged(UserChange);
    return subscriber;
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
            
            firestore().collection("user").add(userData).then(_r => {
              setUser({ ...user, ...userData });

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
    let userData = await firestore().collection("user").where("id","==", auth().currentUser.uid).limit(1).get()
    userData.docs[0].ref.update({
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
