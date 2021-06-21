import React from "react";
import { View, Text ,TextInput,StyleSheet ,TouchableOpacity} from "react-native";
import {authStyles} from '../styles/authStyle'

const Register = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={authStyles.upper}>
        <View style={{alignItems:'center'}}>
          <Text style={authStyles.maintext}>Academia International College</Text>
          <View style={{marginTop:5,height:5,width:200,backgroundColor:'#f9f9f9'}}></View>
        </View>
        <View style={{marginTop:50}}>
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
            <Text style={{marginTop:10,fontSize:18}}>Already have account? 
            <Text style={{color:'#666',fontWeight:'bold'}}>Login</Text></Text>
          </View>
      </View>
    </View>
  );
};

export default Register;

