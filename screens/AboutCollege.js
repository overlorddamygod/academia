import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { globalStyles, SIZE } from "../styles/globalStyle";
import * as Animatable from "react-native-animatable";
const AboutCollege = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <>
      <Header
        title="Academia Int'l College"
        navigation={navigation}
        showSidebar={false}
      />
      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        <View style={styles.top}>
          <ImageBackground
            source={{ uri: "https://academiacollege.edu.np/img/landing.jpg" }}
            style={styles.cover}
          ></ImageBackground>
        </View>

        <Animatable.View animation="fadeInUp"
          style={{
            flex: 1,
            width: SIZE.screenWidth,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -SIZE.width * 3,
            zIndex: 2,
          }}
        >
          <QuickInfo />
          <View
            style={{
              // borderWidth: 1,
              // borderColor: colors.border,
              borderRadius: 10,
              backgroundColor: colors.card,
              padding: 20,
              width: SIZE.screenWidth * 0.9,
              marginTop: SIZE.width,
            }}
          >
            <Text
              style={{
                ...globalStyles.boldText,
                textAlign: "center",
                color: colors.text,
              }}
            >
              About Us
            </Text>
            <Text style={{ color: colors.text, lineHeight: 24, fontSize: 17 }}>
              Academia International College, affiliated with Tribhuvan
              University, is one of the premier institutions dedicated to
              providing quality education in a fully-integrated, multicultural
              environment.
            </Text>
            <Text
              style={{
                marginTop: 20,
                color: colors.text,
                lineHeight: 24,
                fontSize: 17,
              }}
            >
              The College occupies spacious area at Lalitpur with excellent
              facilities. In our Graduate School, we are one of the pioneer
              institutes in Nepal to introduce B.Sc. CSIT program offered by
              Tribhuvan University.
            </Text>
          </View>
        </Animatable.View>

      </ScrollView>
    </>
  );
};

export default AboutCollege;
export const QuickInfo = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: colors.border,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: colors.card,
        padding: 20,
        width: SIZE.screenWidth * 0.9,
      }}
    >
      <Text
        style={{
          ...globalStyles.boldText,
          textAlign: "center",
          color: colors.text,
        }}
      >
        Quick Info
      </Text>
      <View
        style={{
          textAlign: "center",
          height: 1,
          width: "70%",
          marginTop: 6,
          backgroundColor: "lightgray",
        }}
      ></View>
      <Info icon="phone" data="01-23567" />
      <Info icon="map-marker" data="Gwarkhu , Lalitpur" />
      <Info icon="code" data="academiacollege.edu.np" />
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZE.width,
          justifyContent: "space-evenly",
          zIndex: 10,
        }}
      >
        <Icons
          icon="facebook"
          color="#2a51bf"
          link="https://www.facebook.com/academiacollege"
        />
        <Icons
          icon="linkedin"
          color="#1c1a1b"
          link="https://www.linkedin.com"
        />
        <Icons
          icon="instagram"
          color="#e04189"
          link="https://www.instagram.com/academia.college/"
        />
      </View>
    </View>
  );
};
const Info = ({ icon, data }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.iconText}>
      <FontAwesome name={`${icon}`} size={24} color="#7d81f5" />
      <Text
        style={{
          color: colors.text,
          marginLeft: 10,
          lineHeight: 24,
          fontSize: 17,
        }}
      >
        {data}
      </Text>
    </View>
  );
};
export const Icons = ({ icon, color, link = "" }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => Linking.openURL(`${link}`)}
      style={{
        ...styles.icons,
        marginLeft: SIZE.width,
        backgroundColor: `${color}`,
      }}
    >
      <FontAwesome name={`${icon}`} size={25} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  top: {
    // backgroundColor: "#757BBD",
    borderBottomRightRadius: 20,
    height: SIZE.screenHeight * 0.34,
    borderBottomLeftRadius: 20,
    position: "relative",
    zIndex: 2,
  },
  cover: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  icons: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",

    marginTop: SIZE.height * 0.6,
  },
});
