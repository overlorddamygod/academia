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

const sendNotification = (data) => {
  // messaging().
  messaging().sendMessage({
    notification: {
      title: data.title,
      body: data.title + data.date,
    },
    messageId: "22424",
  });
};

export { requestUserPermission, getFcmToken, sendNotification };
