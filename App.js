import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./navigation/Auth";
import DrawerTab from "./navigation/Drawer";
import { useUserContext } from "./providers/user";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import messaging from "@react-native-firebase/messaging"
import database from "@react-native-firebase/database"

export default function App() {
  const { user, setUser } = useUserContext();
  const [intializing, setInitializing] = useState(true);

  const UserChange = async (u)=> {
    const loggedUser = auth().currentUser;
    console.log("USERCHANGE", u)
    if ( loggedUser ) {
      try {
        setUser(loggedUser);
        if ( intializing ) setInitializing(false) 

        let userSnapshot = await firestore().collection("user").where("id","==", loggedUser.uid).limit(1).get()
        if ( userSnapshot.size > 0 ) {

          const userData = userSnapshot.docs[0].data()

          // if (requestUserPermission()) {
          //   const token = await getFcmToken()
          //   userSnapshot.docs[0].ref.update({
          //     token
          //   })
          // }
          setUser({...user,...userData});
          messaging().subscribeToTopic(`${userData.title}`)
          const onlineStatusRef = database().ref(`/status/${loggedUser.uid}`)

          onlineStatusRef.set(true).then(()=>console.log("ONLINE"))
          onlineStatusRef.onDisconnect().remove().then(()=>console.log("OFFLINE"))
        }
      }
      catch(err) {
        console.log("ERRORR",err)
        setUser(null);
      }
    }
    if (!loggedUser) {
      setUser(null)
    }
    setInitializing(false)
  }

  useEffect(() => {
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

  
  if ( intializing ) return null

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        {user ? <DrawerTab /> : <Auth />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop:34,
  },
});
