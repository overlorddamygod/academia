import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import { getErrorMessage, showToast } from "../utils/error";

const ForgotPassword = ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState(params.email || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim()) {
      showToast("Email address not provided");
      return;
    }
    setLoading(true);
    try {
      const result = await auth().sendPasswordResetEmail(email.trim());
      showToast("Password reset link sent to your email address");
      setLoading(false);
    } catch (err) {
      const errorMessage =
        getErrorMessage(err.code) || "Error sending password reset link";
      showToast(errorMessage);
      setLoading(false);
    }
  };

  return (
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
              placeholderTextColor="#666"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={authStyles.btn} onPress={submit}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={authStyles.text}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
