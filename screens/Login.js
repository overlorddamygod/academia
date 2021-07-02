import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { authStyles } from "../styles/authStyle";
import { SIZE } from "../styles/globalStyle";
import COLORS from "../styles/colors";
import { useUserContext } from "../providers/user";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useUserContext();

  const initLogin = async () => {
    const result = await login(email, password);
    console.log("LOGIN RESULT", result);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View style={authStyles.upper}>
          <View style={{ alignItems: "center" }}>
            <Text style={authStyles.maintext}>Academia </Text>
            <Text style={authStyles.maintext}>International College</Text>
            <View style={authStyles.line}></View>
          </View>
          <View style={{ marginTop: SIZE.height * 0.8 }}>
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
            <Text style={{ marginTop: SIZE.height / 8, fontSize: 14 }}>
              <Text
                style={{ color: "#666", fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("ForgotPassword", {
                    email,
                  });
                }}
              >
                {" "}
                Forgot Password ?
              </Text>
            </Text>
            <TouchableOpacity style={authStyles.btn} onPress={initLogin}>
              <Text style={authStyles.text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={authStyles.btn}
              onPress={() => {
                loginWithGoogle();
              }}
            >
              <Text style={authStyles.text}>Login With Google</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: SIZE.height / 8, fontSize: 18 }}>
              Already have account?
              <Text
                style={{ color: "#666", fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                {" "}
                {` `} Register
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
