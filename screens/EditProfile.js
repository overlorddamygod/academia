import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "../components/Header";
import { useUserContext } from "../providers/user";
import { authStyles } from "../styles/authStyle";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const EditProfile = ({ navigation }) => {
  const { user } = useUserContext();
  const { colors } = useTheme();
  const [EditUser, setEditUser] = useState({
    github: user.github_link,
    facebook: user.facebook_link,
    linkedin: user.linkedin_link,
    bio: user.bio,
  });

  console.log(user);
  const updateUser = async () => {
    await firestore()
      .collection("user")
      .doc(auth().currentUser.uid)
      .update({
        github_link: EditUser.github,
        facebook_link: EditUser.facebook,
        linkedin_link: EditUser.linkedin,
        bio: EditUser.bio,
      })
      .then((data) => {
        showToast("Edited Successfully !");
      });
  };
  return (
    <>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Header title="Edit Profile" navigation={navigation} />

            <Image
              source={{
                uri: "https://i.pinimg.com/originals/fe/17/83/fe178353c9de5f85fc9f798bc99f4b19.png",
              }}
              style={styles.image}
            />

            <View style={{ marginHorizontal: SIZE.width,marginTop:SIZE.width }}>
            <View>
                <Text
                  style={{
                    ...globalStyles.midText,
                    marginLeft: SIZE.width,
                    color: colors.text,
                  }}
                >
                  Add Little About Yourself
                </Text>
                <TextInput
                  placeholder="Add Bio"
                  style={{ ...authStyles.input }}
                  onChangeText={(txt) => setEditUser({ ...EditUser, bio: txt })}
                  value={EditUser.bio}
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
                  Add GitHub Account
                </Text>
                <TextInput
                  placeholder="Your github"
                  style={authStyles.input}
                  onChangeText={(txt) =>
                    setEditUser({ ...EditUser, github: txt })
                  }
                  value={EditUser.github}
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
                  Add LinkedIn Account
                </Text>
                <TextInput
                  placeholder="Your linkedin"
                  style={authStyles.input}
                  value={EditUser.linkedin}
                  onChangeText={(txt) =>
                    setEditUser({ ...EditUser, linkedin: txt })
                  }
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
                  Add Facebook Account
                </Text>
                <TextInput
                  placeholder="Your facebook"
                  style={authStyles.input}
                  onChangeText={(txt) =>
                    setEditUser({ ...EditUser, facebook: txt })
                  }
                  value={EditUser.facebook}
                />
              </View>
      
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{...globalStyles.btns, padding:16}}
                  onPress={updateUser}
                >
                  <Text style={{ color: "white",fontSize:18 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    ...globalStyles.btns,
                    marginLeft: 6,
                    backgroundColor: COLORS.mainred,
                    padding:16
                  }}
                >
                  <Text style={{ color: "white" ,fontSize:18}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
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
  container: {
    flex: 1,
  },
  inner: {
    padding: 14,
    flex: 1,
  },
});
