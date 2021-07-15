import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { SIZE } from "../styles/globalStyle";
import { AntDesign } from "@expo/vector-icons";
import CustomCard from "../components/CustomCard";

const Subject = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { sub, short } = route.params;
  const [showFirst, setShowFirst] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Header title={short} navigation={navigation} showSidebar={false} />
      <View style={{ flex: 1 }}>
        {/* Tabs */}
        {sub.firstHalf.sem && (
          <View
            style={{
              backgroundColor: colors.mainblue,
              paddingHorizontal: SIZE.width * 2,
              flexDirection: "row",
              height: SIZE.height * 1.25,
              boxSizing: "border-box",
            }}
          >
            <CustomTab
              title={sub.firstHalf.sem}
              selected={showFirst}
              onPress={() => setShowFirst(true)}
            />
            {sub.secondHalf && (
              <CustomTab
                title={sub.secondHalf?.sem}
                selected={!showFirst}
                onPress={() => setShowFirst(false)}
              />
            )}
          </View>
        )}
        {/* Subject cards */}
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={showFirst ? sub.firstHalf.subject : sub.secondHalf.subject}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({ item }) => {
              return <SubjectCard subject={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default Subject;

const CustomTab = ({ title, selected, onPress }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.99}
      style={{
        flex: 1,
        justifyContent: "center",
        borderBottomColor: "white",
        borderBottomWidth: selected ? 3 : 0,
      }}
      underlayColor="#999"
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 17,
          color: "white",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
};

const SubjectCard = ({ subject }) => {
  const { colors } = useTheme();

  return (
    <CustomCard style={{ paddingVertical: SIZE.width }}>
      <>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: 18 }}>
            {subject.name}
          </Text>
        </View>
        {subject.link && (
          <TouchableOpacity
            onPress={() => Linking.openURL(subject.link)}
            style={{ width: SIZE.width * 2 }}
          >
            <AntDesign name="clouddownload" size={30} color={colors.text} />
          </TouchableOpacity>
        )}
      </>
    </CustomCard>
  );
};
