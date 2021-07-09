import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark((prev) => {
      AsyncStorage.setItem("isDark", COLOR[`${!prev}`]);
      return !prev;
    });
  };

  const COLOR = {
    LIGHT: false,
    DARK: true,

    false: "LIGHT",
    true: "DARK",
  };

  useEffect(() => {
    async function getColorMode() {
      try {
        const value = await AsyncStorage.getItem("isDark");
        if (value !== null) {
          setIsDark(COLOR[value]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getColorMode();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
