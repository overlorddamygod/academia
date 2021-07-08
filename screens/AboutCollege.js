import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity,Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { FontAwesome } from '@expo/vector-icons';
const AboutCollege = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Header title="Academia Int'l College" navigation={navigation} />
      <View style={styles.top}>
        <ImageBackground
          source={{ uri: "https://academiacollege.edu.np/img/landing.jpg" }}
          style={styles.cover}
        ></ImageBackground>
      </View>
      <View style={{width:SIZE.screenWidth,justifyContent:"center",alignItems:'center',marginTop:-SIZE.width*3}}>
      <View style={{borderWidth:1,borderColor:colors.border,backgroundColor:colors.card,padding:20,width:SIZE.screenWidth*0.9}}>
        <Text style={{ ...globalStyles.boldText,textAlign:'center', color: colors.text }}>
          About Us
        </Text>
        <Text style={{color:colors.text,lineHeight:24,fontSize:17}}>
          Academia International College, affiliated with Tribhuvan University,
          is one of the premier institutions dedicated to providing quality
          education in a fully-integrated, multicultural environment.
        </Text>
        <Text style={{marginTop:20,color:colors.text,lineHeight:24,fontSize:17}}>
        The College occupies spacious area at Lalitpur with excellent facilities. In our Graduate School, we are one of the pioneer institutes in Nepal to introduce B.Sc. CSIT program offered by Tribhuvan University.
        </Text>
      </View>
      </View>
    <View style={{flexDirection:'row',marginTop:SIZE.width,justifyContent:'space-evenly'}}>
          <TouchableOpacity 
          activeOpacity={0.7}
           onPress={() => Linking.openURL("https://facebook.com")}
          style={{...styles.icons,backgroundColor:"#2a51bf"}}>
          <FontAwesome name="facebook" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
          activeOpacity={0.7}
          style={{...styles.icons,backgroundColor:"#1c1a1b"}}>
          <FontAwesome name="linkedin" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
          style={{...styles.icons,backgroundColor:"#e04189"}}>
          <FontAwesome name="instagram" size={32} color="white" />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutCollege;

const styles = StyleSheet.create({
  top: {
    // backgroundColor: "#757BBD",
    borderBottomRightRadius: 20,
    height: SIZE.screenHeight * 0.34,
    borderBottomLeftRadius: 20,
    position: "relative",
    zIndex: 2,
  },
  cover: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  icons:{
    width:60,
    height:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  }
});
