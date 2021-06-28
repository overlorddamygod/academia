import React from "react";
import { View, Text, Button, StyleSheet, TextInput,ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import COLORS from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useUserContext } from "../providers/user";
import { SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import UpcomingEvent from "../components/UpcomingEvent";
import HomeNotice from "../components/HomeNotice";
const Home = ({ navigation }) => {
  const { user } = useUserContext();
  return (
    <View style={{flex:1,backgroundColor:'#edeef2'}}>
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

      <View style={{flex:1}}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        
      <View>
        <UpcomingEvent />
      </View>
      <View style={{flex:1}}>
        <HomeNotice  navigation={navigation}/>
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
