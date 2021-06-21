import {StyleSheet}  from "react-native";
import COLORS from "./colors";

export const globalStyles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
   },
   txt:{
        color:'white',
        fontSize:22,
        fontWeight:'normal'
   },
   boldText:{
       color:'#333',
       fontSize:23,
       fontWeight:'bold'
   },
   midText:{
    color:'#333',
    fontSize:16,
    fontWeight:'normal'
   },
   colorText:{
    color:COLORS.darkblue,
    fontSize:19,
    fontWeight:'bold'
   },
  });
  