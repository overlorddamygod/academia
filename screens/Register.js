import React from "react";
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

const Register = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1,justifyContent:"center" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center" }}
        behavior="position"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: COLORS.main }}>
            <View style={authStyles.upper}>
              <View style={{ alignItems: "center" }}>
                <Text style={authStyles.maintext}>
                  Academia International College
                </Text>
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
                <TextInput placeholder="Username" style={authStyles.input} />
                <TextInput placeholder="Email" style={authStyles.input} />
                <TextInput
                  placeholder="Password"
                  autoCompleteType="password"
                  secureTextEntry={true}
                  style={authStyles.input}
                />
                <TextInput
                  placeholder="Confirm Password"
                  autoCompleteType="password"
                  secureTextEntry={true}
                  style={authStyles.input}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={authStyles.btn}>
                  <Text style={authStyles.text}>Register</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 5, fontSize: 18 }}>
                  Already have account?
                  <Text
                    style={{ color: "#666", fontWeight: "bold" }}
                    onPress={() => {
                      navigation.popToTop();
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
        {/* <View style={{ height: 100 }} /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
