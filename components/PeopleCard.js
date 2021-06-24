import React from "react";
import { View, Text ,Image,StyleSheet, TouchableOpacity,Button} from "react-native";
import COLORS from "../styles/colors";
import { globalStyles } from "../styles/globalStyle";


const PeopleCard = ({data}) => {

    return (
  
      <View
        style={{
          marginHorizontal: 25,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 8,
          padding: 12,
          flexDirection:'row',
          ...globalStyles.shadow,
        }}
      >
       <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
            }}
            style={styles.avatar}
          />
      </View>
        <View style={{marginLeft:20}}>
          <Text style={{color:'#444', fontWeight: "bold", fontSize: 20, marginVertical: 2 }}>
            {data.username}
          </Text>
          <Text style={{...globalStyles.midText, color: "#888" }}>{data.email}</Text>
          <Text style={{...globalStyles.midText, color: "#888" }}>Semester : {data.semester}</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.msgBtn}>
             <Text style={{color:"white"}}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
export default PeopleCard;


const styles = StyleSheet.create({

  
    avatar: {
      height: 50,
      width: 50,
      borderRadius: 50,
      resizeMode: "cover",
    },
    msgBtn:{
        backgroundColor:"blueviolet",
        padding:8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:4,
        marginTop:4,
        width:90
    }
  });
  