import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useUserContext } from "../providers/user";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import { getErrorMessage, showToast } from "../utils/error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [registering, setRegistering] = useState(false);

  const { register } = useUserContext();

  const initRegister = async () => {
    if (!username.trim()) {
      showToast("Please enter your username");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter your email");
      return;
    }
    if (!password1 || !password2) {
      showToast("Please enter your password");
      return;
    }
    if (password1 != password2) {
      showToast("Provided passwords do not match");
      return;
    }
    setRegistering(true);
    try {
      let registerResult = await register(
        username.trim(),
        email.trim(),
        password1
      );
      const res = await registerResult.json();
      if (!res.error) {
        showToast("Successfully signed up. Please log in");
        navigation.goBack();
      } else {
        let errorMessage =
          getErrorMessage(res.error.code) ||
          "Error signing up. Please try again";
        showToast(errorMessage);
      }
      setRegistering(false);
    } catch (err) {
      let errorMessage =
        getErrorMessage(err.code) || "Error signing up. Please try again";

      showToast(errorMessage);
      setRegistering(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: COLORS.main }}>
          <View style={authStyles.upper}>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../images/logo.png")}
                  style={{
                    height: SIZE.screenWidth * 0.1,
                    width: SIZE.screenWidth * 0.1,
                  }}
                />
                <Text style={{ ...authStyles.maintext, alignSelf: "flex-end" }}>
                  cademia{" "}
                </Text>
              </View>
              <Text style={authStyles.maintext}>International College</Text>
              <View style={authStyles.line}></View>
            </View>
            <View style={{ marginTop: SIZE.height * 0.8 }}>
              <Text style={authStyles.maintext}>Register</Text>
            </View>
          </View>

          <View style={{ ...authStyles.lower, flex: 1 }}>
            <View>
              <TextInput
                placeholder="Username"
                style={authStyles.input}
                onChangeText={(text) => {
                  setUsername(text.trim());
                }}
                value={username}
              />
              <TextInput
                placeholder="Email"
                style={authStyles.input}
                onChangeText={(text) => {
                  setEmail(text.trim());
                }}
                value={email}
              />
              <TextInput
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry={true}
                style={authStyles.input}
                onChangeText={setPassword1}
                value={password1}
              />
              <TextInput
                placeholder="Confirm Password"
                autoCompleteType="password"
                secureTextEntry={true}
                style={authStyles.input}
                onChangeText={setPassword2}
                value={password2}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{ ...authStyles.btn, flexDirection: "row" }}
                onPress={initRegister}
              >
                {registering ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <AntDesign name="login" size={23} color="white" />
                    <Text
                      style={{ ...authStyles.text, marginLeft: SIZE.width }}
                    >
                      Register
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  color: "#444",
                  marginTop: SIZE.height / 8,
                  fontSize: 18,
                }}
              >
                Already have account?
                <Text
                  style={{ color: "#222", fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  {" "}
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Register;
