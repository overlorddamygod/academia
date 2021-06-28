import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { globalStyles } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import Header from "../components/Header";
import PeopleCard from "../components/PeopleCard";
import { authStyles } from "../styles/authStyle";
import { Ionicons } from "@expo/vector-icons";
import { useCollection } from "../hooks/firestore";

const StudentList = ({ navigation }) => {
  const { user } = useUserContext();
  const [students, loading, error] = useCollection(
    firestore()
      .collection("user")
      .where("title", "==", "Student")
      .where("semester", "==", 3)
      .where("id", "!=", user.id)
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Student List"
        navigation={navigation}
        showSidebar={false}
      />
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={{
              ...authStyles.input,
              ...globalStyles.search,
              backgroundColor: "#d3ddf0",
              color: "#555",
            }}
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <View style={{ marginTop: 50, flex: 1 }}>
          {loading ? (
            <View style={{ alignItems: "center" }}>
             <ActivityIndicator size="large" color="#f44" />
            </View>
          ) : error ? (
            <View style={{ alignItems: "center" }}>
              <Text style={globalStyles.boldText}>error</Text>
            </View>
          ) : (
            <FlatList
              data={students.filter(
                (student) =>
                  student.username.match(new RegExp(searchTerm, "i")) ||
                  student.email.match(new RegExp(searchTerm, "i"))
              )}
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
    </View>
  );
};

export default StudentList;
