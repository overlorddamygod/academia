import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../components/Header";
import HomeNotice from "../components/HomeNotice";
import ImageCarousel from "../components/ImageCarousel";
import { ThemeContext } from "../components/Theme";
import UpcomingEvent from "../components/UpcomingEvent";
import { images } from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { QuickInfo } from "./AboutCollege";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const { isDark } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        showBackMenu={false}
        title={`Hello, ${auth().currentUser.displayName || ""}`}
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
                paddingLeft: SIZE.width,
                marginTop: -SIZE.width / 1.8,
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

      <View style={{ flex: 1, paddingHorizontal: SIZE.width }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                ...globalStyles.card,
                backgroundColor: colors.card,
                marginBottom: 4,
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ color: colors.text, fontSize: 16 }}>
                Recent Photos
              </Text>
            </View>
            <ImageCarousel images={images} />
          </View>

          <View>
            <UpcomingEvent navigation={navigation} />
          </View>

          <View style={{ flex: 1 }}>
            <HomeNotice navigation={navigation} />
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QuickInfo />
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
