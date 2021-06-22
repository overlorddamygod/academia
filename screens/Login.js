import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User succesfully signed in");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
    <View style={{ flex: 1,backgroundColor: COLORS.main }}>
      <View style={authStyles.upper}>
        <View style={{alignItems:'center'}}>
          <Text style={authStyles.maintext}>Academia </Text>
          <Text style={authStyles.maintext}>International College</Text>
          <View style={{marginTop:5,height:5,width:200,backgroundColor:'#f9f9f9'}}></View>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={authStyles.maintext}>Login</Text>
        </View>
        </View>

        <View style={authStyles.lower}>
          <View>
            <TextInput
              placeholder="Email"
              autoCompleteType="email"
              keyboardType="email-address"
              style={authStyles.input}
              onChangeText={setEmail}
              value={email}
            />

            <TextInput
              placeholder="Password"
              autoCompleteType="password"
              secureTextEntry={true}
              style={authStyles.input}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={authStyles.btn} onPress={initLogin}>
              <Text style={authStyles.text}>Login</Text>
            </TouchableOpacity>
            <Text style={{marginTop:5,fontSize:18}}>Already have account? 
              <Text style={{color:'#666',fontWeight:'bold'}} onPress={()=> {
                 navigation.navigate('Register');
              }}> Register</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
