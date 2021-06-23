import React, { useState } from "react";
import {
  Keyboard,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import auth from "@react-native-firebase/auth";
import { useUserContext } from "../providers/user";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false)

  const { register } = useUserContext();

  const initRegister = async () => {
    setRegistering(true)
    const registerResult = await register(username, email, password)
    console.log(registerResult)
    setRegistering(false)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View style={authStyles.upper}>
          <View style={{ alignItems: "center" }}>
            <Text style={authStyles.maintext}>Academia</Text>
            <Text style={authStyles.maintext}>International College</Text>
            <View
              style={authStyles.line}
            ></View>
          </View>
          <View style={{ marginTop: SIZE.height * 0.8 }}>
            <Text style={authStyles.maintext}>Register</Text>
          </View>
        </View>
        { registering ? <Text>Register in process. Please Wait.</Text> :
        <View style={{ ...authStyles.lower, flex: 1 }}>
          <View>
            <TextInput
              placeholder="Username"
              style={authStyles.input}
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              placeholder="Email"
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
            <TextInput
              placeholder="Confirm Password"
              autoCompleteType="password"
              secureTextEntry={true}
              style={authStyles.input}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={authStyles.btn} onPress={initRegister}>
              <Text style={authStyles.text}>Register</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: SIZE.height / 8, fontSize: 18 }}>
              Already have account?
              <Text
                style={{ color: "#666", fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                {` `}Login
              </Text>
            </Text>
          </View>
        </View>
}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
