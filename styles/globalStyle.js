import { StyleSheet,Dimensions } from "react-native";
import COLORS from "./colors";

const {width, height} = Dimensions.get("window")
const SIZE = {
  width: width * 0.05,
  height: height * 0.05,
  screenWidth: width,
  screenHeight: height
};

console.log(SIZE);

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "white",
    fontSize: 22,
    fontWeight: "normal",
  },
  boldText: {
    color: "#333",
    fontSize: 23,
    fontWeight: "bold",
  },
  midText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "normal",
  },
  colorText: {
    color: COLORS.darkblue,
    fontSize: 19,
    fontWeight: "bold",
  },
  input: {
    height: SIZE.height * 1.4,
    fontSize: 18,
    backgroundColor: "#CDD1EF",
    color: "#444",
    borderRadius: 6,
    marginVertical:5
  }
});

export { globalStyles, SIZE }