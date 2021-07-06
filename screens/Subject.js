import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

const Subject = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { sub ,short} = route.params;
  const [half, sethalf] = useState("first");

  const changeHalf = () => {
    if (half === "first") {
      sethalf("second");
    }
    if (half === "second") {
      sethalf("first");
    }
  };

  console.log(sub);
  return (
    <>
      <Header title={short} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
            {sub.secondHalf &&
          <View
            style={{
              flexDirection: "row",
              padding: SIZE.height * 0.2,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
               ...styles.top,
                backgroundColor: half === "first" ? "#FB616A" : null,
              }}
              onPress={changeHalf}
            >
              <Text style={{ fontSize:17,color: half!="first" ? colors.text: "white" }}>{sub.firstHalf.sem}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
              ...styles.top,
                backgroundColor: half === "second" ? "#FB616A" : null,
                
              }}
              onPress={changeHalf}
            >
              <Text style={{ fontSize:17,color: half!="second" ? colors.text : "white" }}>{sub.secondHalf.sem}</Text>
            </TouchableOpacity>
          </View>}

          {half === "first" && (
            <View style={{ marginTop: SIZE.height }}>
              <Text
                style={{
                  ...globalStyles.boldText,
                  color: colors.text,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {sub.firstHalf.sem}
              </Text>
              {sub.firstHalf.subject.map((a) => (
                <TouchableOpacity key={a.short}
                  style={{ ...styles.cards, backgroundColor: colors.card }}
                >
                  <Text style={{ color: colors.text, fontSize: 18 }}>
                    {a.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {half === "second" && (
            <View style={{ marginTop: SIZE.height }}>
              <Text
                style={{
                  ...globalStyles.boldText,
                  color: colors.text,
                  textAlign: "center",
                }}
              >
               {sub.secondHalf.sem}
              </Text>
              {sub.secondHalf.subject.map((a) => (
                <TouchableOpacity
                key={a.short}
                  style={{ ...styles.cards, backgroundColor: colors.card }}
                >
                  <Text style={{ color: colors.text, fontSize: 18 }}>
                    {a.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
export default Subject;
const styles = StyleSheet.create({
  cards: {
    borderRadius: 5,
    padding: SIZE.width * 1.2,
    marginVertical: 5,
  },
  top:{
    padding: 15,
    width: SIZE.screenWidth * 0.45,
    borderRadius:4,
    marginHorizontal:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

