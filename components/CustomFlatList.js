import React from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

const CustomFlatList = ({
  data,
  refreshing,
  onRefresh,
  keyExtractor,
  renderItem,
  ListEmptyComponentText = " ",
  spinnerColor = "red",
}) => {
  const { colors } = useTheme();

  if (refreshing) {
    return (
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <ActivityIndicator color={spinnerColor} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: colors.text }}>{ListEmptyComponentText}</Text>
        </View>
      )}
    />
  );
};

export default CustomFlatList;
