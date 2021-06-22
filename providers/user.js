import React, { createContext, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";

const initialUser = {
  username: null,
  email: null,
};

const UserContext = createContext(initialUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(initialUser);

  useEffect(() => {
    async function UserChange(user) {
      setUser(auth().currentUser);
    }
    const subscriber = auth().onAuthStateChanged(UserChange);
    return subscriber;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, UserContext, useUserContext };
