import React from "react";
import { Keyboard,View, Text ,TextInput,StyleSheet ,TouchableOpacity,TouchableWithoutFeedback} from "react-native";
import {authStyles} from '../styles/authStyle'
import COLORS from "../styles/colors";

const Register = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss}>
    <View style={{ flex: 1 , backgroundColor: COLORS.main}}>
      <View style={authStyles.upper}>
        <View style={{alignItems:'center'}}>
          <Text style={authStyles.maintext}>Academia International College</Text>
          <View style={{marginTop:5,height:5,width:200,backgroundColor:'#f9f9f9'}}></View>
        </View>
        <View style={{marginTop:30}}>
          <Text style={authStyles.maintext}>Register</Text>
        </View>
      </View>
      <View style={authStyles.lower}>
          <View>
            <TextInput 
             placeholder="Username"
            style={authStyles.input}/>
             <TextInput 
             placeholder="Email"
            style={authStyles.input}/>
             <TextInput 
             placeholder="Password"
            style={authStyles.input}/>
             <TextInput 
             placeholder="Confirm Password"
            style={authStyles.input}/>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={authStyles.btn}>
                <Text style={authStyles.text}>Register</Text>
            </TouchableOpacity>
            <Text style={{marginTop:5,fontSize:18}}>Already have account? 
            <Text style={{color:'#666',fontWeight:'bold'}} onPress={()=> {
                navigation.popToTop()
              }}> Login</Text></Text>
          </View>
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

