import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, KeyboardAwareScrollView } from "react-native-ui-lib";
import { CustomTextInput, InputContainer } from "../components/CustomInput";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import COLORS from "../styles/colors";
import { SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";

const EditProfile = ({ navigation }) => {
  const { user } = useUserContext();
  const { colors } = useTheme();
  const [editUser, setEditUser] = useState({
    github: user.github_link,
    facebook: user.facebook_link,
    linkedin: user.linkedin_link,
    bio: user.bio,
  });

  console.log(user);
  const updateUser = async () => {
    try {
      await firestore().collection("user").doc(auth().currentUser.uid).update({
        github_link: editUser.github,
        facebook_link: editUser.facebook,
        linkedin_link: editUser.linkedin,
        bio: editUser.bio,
      });
      showToast("Edited Successfully !");
    } catch (err) {
      showToast("Error editing your profile");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.mainblue,
      }}
    >
      <Header
        title="Edit Profile"
        navigation={navigation}
        showSidebar={false}
      />
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopEndRadius: 40,
          paddingTop: SIZE.height * 0.5,
          paddingHorizontal: SIZE.width * 1.5,
          marginTop: SIZE.height / 5,
        }}
      >
        <KeyboardAwareScrollView>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
            }}
            style={styles.image}
          />
          <InputContainer label="Tell a little about yourself">
            <CustomTextInput
              placeholder=""
              value={editUser.bio}
              onChangeText={(text) => {
                setEditUser({
                  ...editUser,
                  bio: text,
                });
              }}
            />
          </InputContainer>
          <InputContainer label="Github link">
            <CustomTextInput
              placeholder=""
              value={editUser.github}
              onChangeText={(text) => {
                setEditUser({
                  ...editUser,
                  github: text,
                });
              }}
            />
          </InputContainer>
          <InputContainer label="Linkedin link">
            <CustomTextInput
              placeholder=""
              value={editUser.linkedin}
              onChangeText={(text) => {
                setEditUser({
                  ...editUser,
                  linkedin: text,
                });
              }}
            />
          </InputContainer>
          <InputContainer label="Facebook link">
            <CustomTextInput
              placeholder=""
              value={editUser.facebook}
              onChangeText={(text) => {
                setEditUser({
                  ...editUser,
                  facebook: text,
                });
              }}
            />
          </InputContainer>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              label="Edit Profile"
              backgroundColor="#6765c2"
              style={{
                marginVertical: SIZE.height * 0.45,
                marginRight: SIZE.width * 0.5,
              }}
              onPress={updateUser}
            />
            <Button
              label="Cancel"
              backgroundColor={COLORS.mainred}
              style={{
                marginVertical: SIZE.height * 0.45,
              }}
              onPress={() => navigation.goBack()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  image: {
    height: SIZE.height * 2.5,
    width: SIZE.height * 2.5,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "#00000078",
    marginVertical: SIZE.height * 0.75,
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 14,
    flex: 1,
  },
});
