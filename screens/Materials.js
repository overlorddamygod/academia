import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { globalStyles, SIZE } from "../styles/globalStyle";
import Header from "../components/Header";
import { Feather, Ionicons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";
import { faculties } from "../components/SubjectList";



export default function Materials({ navigation }) {
const [myIndex, setMyIndex] = useState(null)
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Materials" navigation={navigation} />
      <View style={{flex:1, padding: 20 }}>
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
            renderItem={({ item ,index}) => (
              <TouchableOpacity 
              onPress={()=>{
                setMyIndex(index===myIndex?null:index)
              } }
              >
              <Faculty 
              short={item.short} 
              full={item.full}
              />

             {index === myIndex && <View style={{flex:1,backgroundColor:colors.card,padding:20,marginVertical:10}}>
                <TouchableOpacity onPress={()=>
                navigation.navigate("Subjects",
                {
                  screen:"Subjects",
                  params:{sub:item.year.firstYear}
                })}
                
                >
              <Faculty 
              short="First Year"
              full="1st and 2nd semester"
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>
                navigation.navigate("Subjects",
                {
                  screen:"Subjects",
                  params:{sub:item.year.secondYear}
                })}
                
                >
              <Faculty 
              short="Second Year"
              full="3rd and 4th semester"
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>
                navigation.navigate("Subjects",
                {
                  screen:"Subjects",
                  params:{sub:item.year.ThirdYear}
                })}
                
                >
              <Faculty 
              short="Third Year"
              full="5th and 6th semester"
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>
                navigation.navigate("Subjects",
                {
                  screen:"Subjects",
                  params:{sub:item.year.FourthYear}
                })}
                
                >
              <Faculty 
              short="Fouth Year"
              full="7th and 8th semester"
              />
              </TouchableOpacity>
              </View>}
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
