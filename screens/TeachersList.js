import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import Header from "../components/Header";
import PeopleCard from "../components/PeopleCard";
import { authStyles } from "../styles/authStyle";
import { useCollectionLazy } from "../hooks/firestore";
import COLORS from "../styles/colors";

const TeacherList = ({ navigation }) => {
  const { user } = useUserContext();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    value: teachers,
    loading,
    onRefresh,
    getMoreData,
  } = useCollectionLazy(
    firestore()
      .collection("user")
      .where("title", "==", "Teacher")
      .where("id", "!=", user.id),
    "id"
  );

  return (
    <>
      {/* {loading && <Text>Loading ...</Text>} */}
      <Header title="Teacher List" navigation={navigation} />
      <View style={{ flex: 1 }}>
        <View>
          <View
            style={{ backgroundColor: COLORS.main, height: SIZE.height }}
          ></View>
          <View
            style={{
              marginTop: -SIZE.height,
              backgroundColor: COLORS.white,
              marginVertical: SIZE.height / 3,
              marginHorizontal: SIZE.width,
              borderRadius: 10,
              ...globalStyles.shadow,
              paddingHorizontal: SIZE.width,
              paddingVertical: SIZE.height / 3,
            }}
          >
            <TextInput
              style={{
                marginVertical: 5,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "#555",
              }}
              placeholder="Search"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        <FlatList
          refreshing={loading}
          onRefresh={onRefresh}
          onEndReached={getMoreData}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => {
            return (
              <View style={{ alignItems: "center", marginTop: 50 }}>
                <Text style={{ color: "black" }}>No teachers found</Text>
              </View>
            );
          }}
          data={teachers.filter(
            (teachers) =>
              teachers.username.match(new RegExp(searchTerm, "i")) ||
              teachers.email.match(new RegExp(searchTerm, "i"))
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PersonDetail")}
            >
              <View style={{ flex: 1 }}>
                <PeopleCard data={item} key={item.id} navigation={navigation} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default TeacherList;
