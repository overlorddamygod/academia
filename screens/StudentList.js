import firestore from "@react-native-firebase/firestore";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Picker,
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

const StudentList = ({ navigation }) => {
  const { user } = useUserContext();
  const [faculty, setFaculty] = useState("Bsc CSIT");
  const [semester, setSemester] = useState("3");
  const { colors } = useTheme();

  const buildQuery = (_faculty, _semester) => {
    return firestore()
      .collection("user")
      .where("title", "==", "Student")
      .where("semester", "==", +_semester)
      .where("faculty", "==", faculty)
      .where("id", "!=", user.id);
  };

  const {
    value: students,
    loading,
    error,
    setQuery,
    onRefresh,
    getMoreData,
  } = useCollectionLazy(buildQuery(faculty, semester), "id");

  useEffect(() => {
    setQuery(buildQuery(faculty, semester));
  }, [semester, faculty]);

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Student List"
        navigation={navigation}
        showSidebar={false}
      />
      <View style={{ flex: 1 }}>
        <View>
          <View
            style={{ backgroundColor: colors.mainblue, height: SIZE.height }}
          ></View>
          <View
            style={{
              marginTop: -SIZE.height,
              backgroundColor: colors.homeCard,
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
                borderColor: "#999",
                fontSize: SIZE.width * 0.9,
              }}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text }}>Faculty</Text>
                <Picker
                  selectedValue={faculty}
                  onValueChange={(itemValue, itemIndex) =>
                    setFaculty(itemValue)
                  }
                >
                  <Picker.Item color="#888" label="Bsc CSIT" value="Bsc CSIT" />
                  <Picker.Item color="#888" label="BCA" value="BCA" />
                  <Picker.Item color="#888" label="BBM" value="BBM" />
                  <Picker.Item color="#888" label="BBS" value="BBS" />
                  <Picker.Item color="#888" label="MBS" value="MBS" />
                </Picker>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text }}>Semester</Text>
                <Picker
                  // style={{ flex: 1 }}
                  selectedValue={semester}
                  onValueChange={(itemValue, itemIndex) =>
                    setSemester(itemValue)
                  }
                >
                  {Array.from({ length: 8 }, (i, index) => `${index + 1}`).map(
                    (semester) => (
                      <Picker.Item
                      color="#888"
                        label={semester}
                        value={semester}
                        key={semester}
                      />
                    )
                  )}
                </Picker>
              </View>
            </View>
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
                <Text style={{ color: colors.text }}>No students found</Text>
              </View>
            );
          }}
          data={students.filter(
            (student) =>
              student.username.match(new RegExp(searchTerm, "i")) ||
              student.email.match(new RegExp(searchTerm, "i"))
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
    </View>
  );
};

export default StudentList;
