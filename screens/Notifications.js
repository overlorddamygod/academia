import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';

const dummyLists = [
  { notifications: "Sandeep Maharjan Messaged You .", date: "20-3-23" },
  { notifications: "Academia Posted Event", date: "20-1-1" },
  { notifications: "Result is Updated", date: "20-1-18" },
  { notifications: "Academia Posted Compotetition", date: "20-1-7" },
];

const Notifications = ({ navigation }) => {
  const [lists, setLists] = useState(dummyLists);
  const { colors } = useTheme();
  return (
    <>
      <Header title="Notifications" navigation={navigation} />
      <View>
        <View style={{ marginTop: 50 }}>
          <FlatList
            data={lists}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 10,
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  padding: 17,
                  flexDirection: "row",
                  
                }}
              >
                <View>
                  <Ionicons
                    name="notifications-circle"
                    size={40}
                    color={colors.text}
                  />
                </View>
                <View style={{ flex:1,marginLeft: 20}}>
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "bold",
                      fontSize: 20,
                      marginVertical: 2,
                      width: "99%",
                    }}
                  >
                    {item.notifications}
                  </Text>
                  <Text style={{ ...globalStyles.midText, color: "#888" }}>
                    {item.date}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
