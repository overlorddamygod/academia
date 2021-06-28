import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";

const HomeNotice = ({navigation}) => {
  const [events, setEvents] = useState([
    { name: "Sports Event", detail: "Submit before may 23", date: "May 23" },
    {
      name: "Dancer Event",
      detail: "Submit before June 1. or It won't be accepted",
      date: "June 1",
    },
    { name: "Sports Event", detail: "Submit before may 23", date: "May 29" },
  ]);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
   {/* only some five latest events for home page . There will be separate page for events */}
      {events.map(item => (
        <View style={styles.events} key={item.date}>
        <View style={{ width: "60%" }}>
          <Text
            style={{
              ...globalStyles.txt,
              fontWeight: "bold",
              color: "#444",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{ ...globalStyles.midText, color: "#888", marginTop: 5 }}
          >
            {item.detail}
          </Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "white", fontSize: 16 }}>
            App Submission
          </Text>
        </TouchableOpacity>
      </View>
      ))}
      <TouchableOpacity onPress={()=>navigation.navigate('Announcements')} style={{ marginTop:SIZE.height *0.4}}>
        <Text style={styles.btnText}>See All Events</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeNotice;
const styles = StyleSheet.create({
  events: {
    padding: SIZE.width,
    position: "relative",
    backgroundColor: "white",
    marginTop: SIZE.width*0.4,
    width: SIZE.screenWidth * 0.9,
    borderRadius: 9,
  
  },
  btn: {
    position: "absolute",
    right: SIZE.width*0.5,
    bottom: SIZE.width*0.5,
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#F05479",
    padding: SIZE.width*0.5,
  },
  btnText:{
   
    color:'#444',
    fontSize:16,
    fontWeight:'bold'
  }

});
