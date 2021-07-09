import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
const EditProfile = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useUserContext();
  return (
    <View>
      <Header title="Edit Profile" navigation={navigation} />

      <Image
        source={{
          uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
        }}
        style={styles.image}
      />
      <View style={{ marginHorizontal: SIZE.width }}>
        <View>
          <Text
            style={{
              ...globalStyles.midText,
              marginLeft: SIZE.width,
              color: colors.text,
            }}
          >
            Email
          </Text>
          <TextInput
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            style={authStyles.input}
            value={user.email}
          />
        </View>
        <View>
          <Text
            style={{
              ...globalStyles.midText,
              marginLeft: SIZE.width,
              color: colors.text,
            }}
          >
            Password
          </Text>
          <TextInput
            placeholder="Password"
            autoCompleteType="password"
            secureTextEntry={true}
            style={authStyles.input}
            //   onChangeText={setPassword}
            value="DummyPassword"
          />
        </View>
        <View>
          <Text
            style={{
              ...globalStyles.midText,
              marginLeft: SIZE.width,
              color: colors.text,
            }}
          >
            Link GitHub Account
          </Text>
          <TextInput
            placeholder="Your github"
            autoCompleteType="password"
            style={authStyles.input}
            //   onChangeText={setPassword}
          />
        </View>
        <View>
          <Text
            style={{
              ...globalStyles.midText,
              marginLeft: SIZE.width,
              color: colors.text,
            }}
          >
            Link Facebook Account
          </Text>
          <TextInput
            placeholder="Your facebook"
            autoCompleteType="password"
            style={authStyles.input}
            //   onChangeText={setPassword}
          />
        </View>
        <View>
          <Text
            style={{
              ...globalStyles.midText,
              marginLeft: SIZE.width,
              color: colors.text,
            }}
          >
            Little About Yourself
          </Text>
          <TextInput
            placeholder="Add Bio"
            style={authStyles.input}
            //   onChangeText={setPassword}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={globalStyles.btns}>
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              ...globalStyles.btns,
              marginLeft: 6,
              backgroundColor: COLORS.mainred,
            }}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "cover",
    zIndex: 2,
    marginTop: SIZE.height,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "#00000078",
  },
});
