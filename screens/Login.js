import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,Image
} from "react-native";
import { useUserContext } from "../providers/user";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import { getErrorMessage, showToast } from "../utils/error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useUserContext();

  const initLogin = async () => {
    if (!email) {
      showToast("Please enter your email");
      return;
    }
    if (!password) {
      showToast("Please enter your password");
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      showToast("Succesfully signed in");
      setLoading(false);
    } catch (err) {
      let errorMessage =
        getErrorMessage(err.code) || "Error logging in. Please try again";

      showToast(errorMessage);
      setLoading(false);
    }
  };
  const initLoginWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      setGoogleLoading(false);
    } catch (err) {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: COLORS.main }}>
          <View style={authStyles.upper}>
            <View style={{ alignItems: "center" }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../images/logo.png')}
            style={{height:SIZE.screenWidth*0.1,width:SIZE.screenWidth*0.1}}
            />
              <Text style={{...authStyles.maintext,alignSelf:'flex-end'}}>cademia </Text>
              </View>
              <Text style={authStyles.maintext}>International College</Text>
              <View style={authStyles.line}></View>
            </View>
            <View style={{ marginTop: SIZE.height * 0.8 }}>
              <Text style={authStyles.maintext}>Sign In</Text>
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
                placeholderTextColor="#666"
              />

              <TextInput
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry={true}
                style={authStyles.input}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword", {
                    email,
                  });
                }}
              >
                <Text
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: SIZE.height / 4,
                  }}
                >
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View></View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity style={{...authStyles.btn, flexDirection: "row",
                  }} onPress={initLogin}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                  <AntDesign name="login" size={23} color="white" />
                  <Text style={{...authStyles.text,marginLeft:SIZE.width}}>Sign In With Email </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={0.7}
                style={{
                  ...authStyles.btn,
                  backgroundColor: "#e8435e",
                  flexDirection: "row",
                  
                }}
                onPress={initLoginWithGoogle}
              >
                {googleLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <AntDesign name="google" size={23} color="white" />
                    <Text style={{...authStyles.text,marginLeft:SIZE.width}}>Sign In With Google</Text>
                  </>
                )}
              </TouchableOpacity>
              <Text style={{color:'#444', marginTop: SIZE.height / 8, fontSize: 18 }}>
                Already have account?
                <Text
                  style={{ color: "#222", fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Login;
