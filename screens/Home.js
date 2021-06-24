import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/globalStyle";
import COLORS from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useUserContext } from "../providers/user";
import { SIZE } from "../styles/globalStyle";
import Header from "../components/Header"

const Home = ({ navigation }) => {
  const { user } = useUserContext();
  return (
    <>
    <Header showBackMenu={false} title={`Hello, ${user.username || ""}`} justifyContent="flex-start" navigation={navigation}></Header>
      <View
        style={{
          backgroundColor: COLORS.main,
          borderBottomRightRadius: 36,
        }}
      >
        <View style={styles.upper}>
          <View>
            <Text style={{ marginTop: -SIZE.width/1.8, ...globalStyles.txt,...{paddingLeft:SIZE.width} }}>
              It's lovely day right ?
            </Text>
          </View>
          <View style={{padding: SIZE.width}}>
            <View style={styles.searchbar}>
              <Ionicons
                name="search"
                size={24}
                color="#777"
              />
              <TextInput style={{color:"#000", flex:1}}placeholder="Search" />
            </View>
          </View>

        </View>
      </View>
      <View style={globalStyles.container}>
        <Text style={globalStyles.boldText}>Home</Text>
        {/* dummy button to navigate between screens */}
        <Button
          title="Go to Chat"
          onPress={() => {
            navigation.navigate("Chat", {
              screen: "Chat",
            });
          }}
        />
        <Button
          title="Go to Chat"
          onPress={() => {
            auth()
              .currentUser.updateProfile({
                displayName: "Pratham",
              })
              .then((a) => {
                alert("successss");
              })
              .catch((err) => {
                alert("err");
              });
          }}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchbar: {
    flexDirection:"row",
    height: SIZE.height * 1.2,
    paddingLeft: SIZE.height * 0.5,
    fontSize: SIZE.height * 0.5,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems:"center"
  },
});
