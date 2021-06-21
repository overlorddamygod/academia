import {StyleSheet}  from "react-native";
import COLORS from "./colors";

export const authStyles = StyleSheet.create({
    upper:{
        padding: 40,
        marginVertical: 10,
        alignItems:'center'
    },
    maintext:{
        color: COLORS.white,
        fontSize:33,
        textAlign:'center'
    },
    text:{
        color: COLORS.white,
        fontSize:18,
    },
    input: {
      height: 50,
      margin: 12,
      padding:10,
      fontSize:18,
      backgroundColor: '#CDD1EF',
      color:'#444',
      borderRadius: 6
    },
    lower:{
        flex:1,
        backgroundColor:'#f5f5f5',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding:30,
        paddingVertical: 50,
        // justifyContent: "center"
    },
    btn:{
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        width: 200,
        backgroundColor: COLORS.royalBlue,
        borderRadius: 4,
        marginVertical: 25
    }
  });
  