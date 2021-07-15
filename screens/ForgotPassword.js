import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { authStyles } from "../styles/authStyle";
import { SIZE } from "../styles/globalStyle";
import COLORS from "../styles/colors";
import { useUserContext } from "../providers/user";
import auth from "@react-native-firebase/auth";
import { getErrorMessage, showToast } from "../utils/error";

const ForgotPassword = ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState(params.email || "");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const result = await auth().sendPasswordResetEmail(email);
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
                <Text style={authStyles.text}>Send New  </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
