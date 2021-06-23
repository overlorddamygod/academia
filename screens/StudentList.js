import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import { useUserContext } from "../providers/user";
import { useCollection } from "../hooks/firestore";
const StudentList = () => {
  const {user} = useUserContext()
  const [ students, loading, error ] = useCollection(firestore().collection("user").where("title","==","Student").where("id","!=",user.id))

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{ item.username }</Text>
        }}
      >

      </FlatList>
    </View>
  );
};


export default StudentList;
