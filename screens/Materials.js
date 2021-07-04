import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ExpandableSection } from "react-native-ui-lib";
import { useTheme } from "@react-navigation/native";
import { faculties } from "../components/SubjectList";
import COLORS from "../styles/colors";

export default function Materials({ navigation }) {
  const [myIndex, setMyIndex] = useState(null);
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Materials" navigation={navigation} />
      <View style={{ flex: 1, padding: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              color: "#333",
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            Materials
          </Text>
          <Text
            style={{
              ...globalStyles.midText,
              fontWeight: "bold",
              lineHeight: 30,
              color: colors.text,
            }}
          >
            Review Your Materials
          </Text>
        </View>
        <View>
          <View style={{ borderWidth: 1 }}></View>
          <FlatList
            data={faculties}
            keyExtractor={(item) => item.date}
            showVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FacultyExpanded data={item} navigation={navigation}></FacultyExpanded>
              // <TouchableOpacity
              //   onPress={() => {
              //     setMyIndex(index === myIndex ? null : index);
              //   }}
              // >
              //   <Faculty short={item.short} full={item.full} />

              //   {index === myIndex && (
              //     <View
              //       style={{
              //         flex: 1,
              //         backgroundColor: colors.card,
              //         padding: 20,
              //         marginVertical: 10,
              //       }}
              //     >
              //       <TouchableOpacity
              //         onPress={() =>
              //           navigation.navigate("Subjects", {
              //             screen: "Subjects",
              //             params: { sub: item.year.firstYear },
              //           })
              //         }
              //       >
              //         <Faculty short="First Year" full="1st and 2nd semester" />
              //       </TouchableOpacity>

              //       <TouchableOpacity
              //         onPress={() =>
              //           navigation.navigate("Subjects", {
              //             screen: "Subjects",
              //             params: { sub: item.year.secondYear },
              //           })
              //         }
              //       >
              //         <Faculty
              //           short="Second Year"
              //           full="3rd and 4th semester"
              //         />
              //       </TouchableOpacity>

              //       <TouchableOpacity
              //         onPress={() =>
              //           navigation.navigate("Subjects", {
              //             screen: "Subjects",
              //             params: { sub: item.year.ThirdYear },
              //           })
              //         }
              //       >
              //         <Faculty short="Third Year" full="5th and 6th semester" />
              //       </TouchableOpacity>
              //       <TouchableOpacity
              //         onPress={() =>
              //           navigation.navigate("Subjects", {
              //             screen: "Subjects",
              //             params: { sub: item.year.FourthYear },
              //           })
              //         }
              //       >
              //         <Faculty short="Fouth Year" full="7th and 8th semester" />
              //       </TouchableOpacity>
              //     </View>
              //   )}
              // </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const FacultyExpanded = ({ data, navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const FacultyHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZE.width,
          paddingVertical: SIZE.height / 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 20, fontWeight: "bold" }}>
          {data.short}
        </Text>
        {expanded ? (
          <Ionicons name="chevron-up-outline" size={32} />
        ) : (
          <Ionicons name="chevron-down-outline" size={32} />
        )}
      </View>
    );
  };

  const Year = ({ year, yearItem }) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 5,
          width: SIZE.width * 2.5,
          height: SIZE.width * 2.5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("Subjects", {
            screen: "Subjects",
            params: { sub: yearItem },
          })
        }
      >
        <Text style={{ fontWeight: "bold", color: COLORS.black }}>{year}</Text>
        <Text>Year</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ExpandableSection
      top={false}
      sectionHeader={FacultyHeader()}
      onPress={() => setExpanded((prev) => !prev)}
      expanded={expanded}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: SIZE.width,
          paddingBottom: SIZE.height / 2,
        }}
      >
        <Year year="1st" yearItem={data.year.firstYear}/>
        <Year year="2nd" yearItem={data.year.secondYear}/>
        <Year year="3rd" yearItem={data.year.thirdYear}/>
        <Year year="4th" yearItem={data.year.fourthYear}/>
      </View>
    </ExpandableSection>
  );
};
const Faculty = ({ short, full }) => {
  const { colors } = useTheme();
  return (
    <View style={{ ...styles.Materialsbtn, borderColor: colors.border }}>
      <Feather name="image" size={24} color={colors.text} />
      <View style={styles.MaterialsbtnText}>
        <Text style={{ ...globalStyles.boldText, color: colors.text }}>
          {short}
        </Text>
        <Text style={{ ...globalStyles.midText, color: colors.text }}>
          {full}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Materialsbtn: {
    marginTop: SIZE.height * 0.6,
    paddingHorizontal: SIZE.width,
    paddingVertical: SIZE.width / 2,
    borderWidth: 1,
    borderRadius: SIZE.width * 0.6,
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  MaterialsbtnText: {
    flex: 1,
    paddingHorizontal: SIZE.width,
  },
});
