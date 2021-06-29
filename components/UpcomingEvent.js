import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const UpcomingEvent = () => {
  const { colors } = useTheme();
  const [events, setEvents] = useState([
    { name: "App Event", date: "May 12" },
    { name: "Sports Event", date: "May 24" },
    { name: "Dancer Event", date: "June 3" },
  ]);
  return (
    <View>
      <View
        style={{...styles.card,backgroundColor:colors.card}}
      >
        <Text style={{ color:colors.text,fontSize: 16 }}>Upcoming Event</Text>
        
      </View>

      <View style={{ width:'100%',padding:SIZE.width*0.7}}>
        <FlatList
        horizontal={true}
          data={events}
          showsHorizontalScrollIndicator={false}
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
    width:SIZE.width *7,
    borderRadius: 5,
    padding: SIZE.width *0.4,
    marginLeft:  SIZE.width *0.7,
    marginTop:SIZE.width *0.7,
    textAlign: "left",
    
  },
  events:{
      padding: SIZE.width *0.7,
      marginHorizontal:6,
      backgroundColor: "#5C5578",
      height:SIZE.screenHeight*0.23 ,
      width:SIZE.screenWidth *0.4,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5
  }
});
