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
import auth from "@react-native-firebase/auth";

const ForgotPassword = ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState(params.email || "");
  console.log(params.email);

  const submit = async () => {
    try {
      const result = await auth().sendPasswordResetEmail(email);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
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
            <Text style={authStyles.maintext}>Forgot Password</Text>
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
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={authStyles.btn} onPress={submit}>
              <Text style={authStyles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
