import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './navigation/Auth'
import Main from './navigation/Main'

export default function App() {
  const [ user, setUser ] = useState(null)

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar barStyle="light-content" />
      {/* <AnnouncementScreen/> */}
      {/* <Register /> */}
      <NavigationContainer>
        {
          user ? <Main/> : <Auth setUser={setUser}/>
        }
      </NavigationContainer>
      {/* <Login /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop:34,
    
  },
});
