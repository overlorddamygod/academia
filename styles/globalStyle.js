import { Dimensions, StyleSheet } from "react-native";
import COLORS from "./colors";

const { width, height } = Dimensions.get("window");
const SIZE = {
  width: width * 0.05,
  height: height * 0.05,
  screenWidth: width,
  screenHeight: height,
};

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
    marginVertical: 5,
  },

  search: {
    position: "absolute",
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: -10,
    width: "90%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  smallavatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  card: {
    borderRadius: 5,
    padding: SIZE.width * 0.5,
    // marginLeft: SIZE.width * 0.7,
    marginVertical: SIZE.width * 0.7,
  },
  btns: {
    width: SIZE.screenWidth * 0.3,
    padding: 8,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#6765c2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});

export { globalStyles, SIZE };
