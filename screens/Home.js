import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useUserContext } from "../providers/user";
import { SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import UpcomingEvent from "../components/UpcomingEvent";
import HomeNotice from "../components/HomeNotice";
import { ThemeContext } from "../components/Theme";
import { useTheme } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const { user,linkWithGoogle } = useUserContext();
  const { isDark } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        showBackMenu={false}
        title={`Hello, ${user.username || ""}`}
        justifyContent="flex-start"
        navigation={navigation}
      ></Header>
      <View
        style={{
          backgroundColor: colors.mainblue,
          borderBottomRightRadius: 36,
        }}
      >
        <View style={styles.upper}>
          <View>
            <Text
              style={{
                ...globalStyles.txt,
                 paddingLeft: SIZE.width ,
                 marginTop: -SIZE.width / 1.8,
                 
              }}
              onPress ={()=> {
                linkWithGoogle()
              }}
            >
              It's {isDark ? "Dark" : "Light"} theme right ?
            </Text>
          </View>
          <View style={{ padding: SIZE.width }}>
            <View style={styles.searchbar}>
              <Ionicons name="search" size={24} color="#777" />
              <TextInput
                style={{ color: "#000", flex: 1 }}
                placeholder="Search"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <UpcomingEvent />
          </View>
          <View style={{ flex: 1 }}>
            <HomeNotice navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: "row",
    height: SIZE.height * 1.2,
    paddingLeft: SIZE.height * 0.5,
    fontSize: SIZE.height * 0.5,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
  },
});
