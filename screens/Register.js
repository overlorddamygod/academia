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
import auth from "@react-native-firebase/auth";
import { useUserContext } from "../providers/user";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();

  const initRegister = () => {
    if (!username || !email || !password) return;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("User account created & signed in!");
        result.user
          .updateProfile({
            displayName: username,
          })
          .then((r) => {
            setUser({ ...user, displayName: username });
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View style={authStyles.upper}>
          <View style={{ alignItems: "center" }}>
            <Text style={authStyles.maintext}>Academia</Text>
            <Text style={authStyles.maintext}>International College</Text>
            <View
              style={{
                marginTop: 5,
                height: 5,
                width: 200,
                backgroundColor: "#f9f9f9",
              }}
            ></View>
          </View>
          <View style={{ marginTop: 30 }}>
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
            <Text style={{ marginTop: 5, fontSize: 18 }}>
              Already have account?
              <Text
                style={{ color: "#666", fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
