import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([
    { name: "App Event", date: "May 12" },
    { name: "Sports Event", date: "May 24" },
    { name: "Dancer Event", date: "June 3" },
  ]);
  return (
    <View>
      <View
        style={styles.card}
      >
        <Text style={{ color: "#444", fontSize: 16 }}>Upcoming Event</Text>
        
      </View>

      <View style={{ width:'100%',padding:10}}>
        <FlatList
        horizontal={true}
          data={events}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={{...globalStyles.shadow,...styles.events}}>
                 <Ionicons name="american-football" size={34} color="white" />
              <Text style={globalStyles.txt}>{item.name} </Text>
              <Text style={{...globalStyles.txt,marginTop:5,color:'lightgray'}}>{item.date} </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};



export default UpcomingEvent;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ACDBD8",
    width:SIZE.width *7,
    borderRadius: 5,
    padding: SIZE.width *0.4,
    margin:  SIZE.width *0.4,
    textAlign: "left",
    
  },
  events:{
      padding: SIZE.width *0.7,
      marginHorizontal:6,
      backgroundColor: "#5C5578",
      height:SIZE.screenHeight*0.2 ,
      width:SIZE.screenWidth *0.5,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5
  }
});
