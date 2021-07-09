import React from "react";
import { StyleSheet, Text, View } from "react-native";

const itemTypes = {
  Exams: "#F05479",
  Classes: "#EBA52A",
  Holiday: "#9336E7",
};

export const AnnouncementCard = ({
  data = { tag: "Classes", title: "Lorem Ipsum", time: "10:00 PM" },
}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        ...styles.shadow,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: itemTypes[data.tag],
          paddingHorizontal: 5,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white" }}>{data.tag}</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginVertical: 8 }}>
        {data.title}
      </Text>
      <Text style={{ color: "#ABABAB" }}>{data.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    height: 60,
    marginTop: -30,
    marginLeft: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
