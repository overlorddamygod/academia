import { StyleSheet } from "react-native";
import COLORS from "./colors";
import { SIZE } from "./globalStyle";

const authStyles = StyleSheet.create({
  upper: {
    padding: SIZE.height,
    marginVertical: SIZE.height / 4,
    alignItems: "center",
  },
  maintext: {
    color: COLORS.white,
    fontSize: 27,
    textAlign: "center",
  },
  line: {
    marginTop: SIZE.height / 8,
    height: SIZE.height / 8,
    width: SIZE.width * 10,
    backgroundColor: "#f9f9f9",
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
  },
  input: {
    height: SIZE.height * 1.2,
    margin: SIZE.height / 4,
    padding: SIZE.height / 4,
    fontSize: 18,
    backgroundColor: "#CDD1EF",
    color: "#444",
    borderRadius: 6,
  },
  lower: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: SIZE.height * 0.8,
    paddingVertical: SIZE.height * 1.2,
  },
  btn: {
    height: SIZE.height * 1.2,
    justifyContent: "center",
    alignItems: "center",
    width: SIZE.width * 10,
    backgroundColor: COLORS.royalBlue,
    borderRadius: 4,
    marginVertical: SIZE.height / 2,
  },
});

export { authStyles };
