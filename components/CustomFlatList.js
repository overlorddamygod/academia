import { useTheme } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const CustomFlatList = ({
  data,
  refreshing,
  onRefresh,
  keyExtractor,
  renderItem,
  onEndReached,
  onEndReachedThreshold = 0.1,
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
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={() => (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: colors.text }}>{ListEmptyComponentText}</Text>
        </View>
      )}
    />
  );
};

export default CustomFlatList;
