import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { AntDesign } from "@expo/vector-icons";

const Subject = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { sub, short } = route.params;
  const [showFirst, setShowFirst] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Header title={short} navigation={navigation} />
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
      <View style={{ padding: 20, flex: 1 }}>
        <FlatList
          data={showFirst ? sub.firstHalf.subject : sub.secondHalf?.subject}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <SubjectCard subject={item} />}
        />
      </View>
    </View>
  );
};
export default Subject;
const styles = StyleSheet.create({
  cards: {
    borderRadius: 5,
    padding: SIZE.width * 1.2,
    marginVertical: 5,
  },
  top: {
    padding: 15,
    width: SIZE.screenWidth * 0.45,
    borderRadius: 4,
    marginHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
    <View
      style={{
        ...styles.cards,
        backgroundColor: colors.card,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 18 }}>{subject.name}</Text>
      </View>
      {subject.link && (
        <TouchableOpacity onPress={() => Linking.openURL(subject.link)}>
          <AntDesign name="clouddownload" size={30} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};
