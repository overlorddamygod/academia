import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
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

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
              <TouchableOpacity style={authStyles.btn} onPress={initLogin}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={authStyles.text}>Login</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...authStyles.btn,
                  backgroundColor: "#f56e77",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
                onPress={async () => {
                  setGoogleLoading(true);
                  try {
                    await loginWithGoogle();
                    setGoogleLoading(false);
                  } catch (err) {
                    setGoogleLoading(false);
                  }
                }}
              >
                {googleLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <AntDesign name="google" size={23} color="white" />
                    <Text style={authStyles.text}>Login With Google</Text>
                  </>
                )}
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
