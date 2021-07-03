import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Feather, Ionicons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

const faculties =[
  {
    id:1,
    short:"BSC CSIT" ,
    full:"Bachelor of Computer Science & Information Technology"
  },
  {
    id:2,
    short:"BCA" ,
    full:"Bachelor of Computer Administration"
  },
  {
    id:3,
    short:"BBM" ,
    full:"Bachelor of Business Management"
  },
  {
    id:4,
    short:"BBS" ,
    full:"Bachelor of Business Studies"
  },
  {
    id:5,
    short:"MBS" ,
    full:"Master in Business Studies"
  },

]

export default function Materials({ navigation }) {

  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Materials" navigation={navigation} />
      <View style={{ padding: 20 }}>
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
         
       
        
          <FlatList 
            data={faculties}
            keyExtractor={(item) => item.date}
            showVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
              onPress={()=> navigation.navigate("Subjects",
              {
                screen:"Subjects",
                params:{user:"bishal rai"}
              })}
              >
              <Faculty 
              short={item.short} 
              full={item.full}
              />
              </TouchableOpacity>
            )}
          />
 
        </View>
      </View>
    </View>
  );
}
const Faculty = ({short,full}) =>{
  const { colors } = useTheme();
  return (
    <View
    style={{ ...styles.Materialsbtn, borderColor: colors.border }}
  >
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
  )
}
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
     flex:1, paddingHorizontal:SIZE.width
  }
});
