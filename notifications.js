import messaging from "@react-native-firebase/messaging";

const requestUserPermission = async () => {
  if (await messaging().hasPermission()) {
    return 1;
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};

export { requestUserPermission, getFcmToken };
