import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import Header from "../components/Header";
import PeopleCard from "../components/PeopleCard";
import { authStyles } from "../styles/authStyle";
import { Ionicons } from "@expo/vector-icons";
import { useCollection } from "../hooks/firestore";

const TeacherList = ({ navigation }) => {
  const { user } = useUserContext();
  const [students, loading, error] = useCollection(
    firestore()
      .collection("user")
      .where("title", "==", "Teacher")
      .where("id", "!=", user.id)
  );
  console.log(students);
  return (
    <>
      {/* {loading && <Text>Loading ...</Text>} */}
      <Header title="Teacher List" navigation={navigation} />
      <View>
        <View style={{ alignItems: "center", position: "relative" }}>
          <TextInput
            style={{
              ...authStyles.input,
              ...globalStyles.search,
              backgroundColor: "#afb7ed",
              color: "#555",
            }}
            placeholder="Search"
          />
        </View>
        <View style={{ marginTop: 50 }}>
          {loading ? (
            <View style={{ alignItems: "center" }}>
              {/* some loading style maybe? */}
              <Text style={globalStyles.boldText}>Loading ..</Text>
            </View>
          ) : (
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("PersonDetail")}
                >
                  <View style={{ flex: 1 }}>
                    <PeopleCard
                      data={item}
                      key={item.id}
                      navigation={navigation}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default TeacherList;
