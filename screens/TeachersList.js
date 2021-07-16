import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import PeopleCard from "../components/PeopleCard";
import { useCollectionLazy } from "../hooks/firestore";
import { useUserContext } from "../providers/user";
import { globalStyles, SIZE } from "../styles/globalStyle";
import CustomFlatList from "../components/CustomFlatList";

const TeacherList = ({ navigation }) => {
  const { user } = useUserContext();
  const { colors } = useTheme();
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
            style={{ backgroundColor: colors.mainblue, height: SIZE.height }}
          ></View>
          <View
            style={{
              marginTop: -SIZE.height,
              backgroundColor: colors.searchDiv,
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
                color: colors.text,
                borderColor: "lightgray",
                fontSize: SIZE.width * 0.9,
              }}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        <CustomFlatList
          refreshing={loading}
          onRefresh={onRefresh}
          onEndReached={getMoreData}
          onEndReachedThreshold={0.1}
          ListEmptyComponentText={"No teachers found"}
          data={teachers.filter(
            (teachers) =>
              teachers.username.match(new RegExp(searchTerm, "i")) ||
              teachers.email.match(new RegExp(searchTerm, "i"))
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("PersonDetail", {
                  screen: "PersonDetail",
                  params: {
                    data: item,
                  },
                })
              }
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
