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

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("Test69");
  const [email, setEmail] = useState("test69@gmail.com");
  const [password1, setPassword1] = useState("test123");
  const [password2, setPassword2] = useState("test123");
  const [registering, setRegistering] = useState(false);

  const { register } = useUserContext();

  const initRegister = async () => {
    if (!username) {
      showToast("Please enter your username");
      return;
    }
    if (!email) {
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
      let registerResult = await register(username, email, password1);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View style={authStyles.upper}>
          <View style={{ alignItems: "center" }}>
            <Text style={authStyles.maintext}>Academia</Text>
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
            <TouchableOpacity style={authStyles.btn} onPress={initRegister}>
              {registering ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={authStyles.text}>Register</Text>
              )}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
