import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";

const HomeNotice = () => {
  const [events, setEvents] = useState([
    { name: "Sports Event", detail: "Submit before may 23", data: "May 23" },
    { name: "Dancer Event", detail: "Submit before June 1. or It won't be accepted", data: "June 1" },
    { name: "Sports Event", detail: "Submit before may 23", data: "May 29" },
  ]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.events}>
            <View style={{width:'60%'}}>
              <Text style={{...globalStyles.txt,fontWeight:'bold' }}>{item.name}</Text>
              <Text style={{ ...globalStyles.midText, color: "white",marginTop:5}}>
                {item.detail}
              </Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={{color:'white',fontSize:16}}>App Submission</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default HomeNotice;
const styles = StyleSheet.create({
  events: {
    padding: 20,
    position:'relative',
    backgroundColor: "#856EE1",
    marginTop: 5,
    width:SIZE.screenWidth *0.9,
    borderRadius: 9,
    marginBottom:10
  },
  btn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#8F7ED9",
    padding: 10,
  },
});
