import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import HomeNotice from "../components/HomeNotice";
import ImageCarousel from "../components/ImageCarousel";
import { ThemeContext } from "../components/Theme";
import UpcomingEvent, { InfoCard, route } from "../components/UpcomingEvent";
import { images } from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { QuickInfo } from "./AboutCollege";

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [routes, setRoutes] = useState(route);
  const [randomRoute, setRandomRoute] = useState("");
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    setRandomRoute(routes[Math.floor(Math.random() * routes.length)]);
  }, []);

  let shuffledImages = images
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        showBackMenu={false}
        title={`Hello, ${auth().currentUser.displayName || ""}`}
        justifyContent="flex-start"
        navigation={navigation}
      ></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: colors.mainblue,
            borderBottomRightRadius: 36,
            height: SIZE.height * 2.7,
            paddingTop: SIZE.width * 0.3,
          }}
        >
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
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZE.width * 0.4,
          }}
        >
          <View
            style={{
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -SIZE.width * 3.3,
            }}
          >
            <InfoCard randomRoute={randomRoute} navigation={navigation} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: -SIZE.height * 0.1,
            paddingHorizontal: SIZE.width,
          }}
        >
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
            <ImageCarousel images={shuffledImages} />
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
