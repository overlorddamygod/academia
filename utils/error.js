import { ToastAndroid } from "react-native";

const errorMap = {
  "auth/invalid-email": "Email address is invalid!",
  "auth/wrong-password": "Incorrect password",
  "auth/too-many-requests": "Too many requests. Account temporarily disabled",
  "auth/user-not-found": "User does not exist",
  "auth/empty-email": "Please enter the email",
  "auth/empty-password": "Please enter the password",
  "auth/invalid-username":
    "The username must be a string with at least 3 characters",
  "auth/email-already-exists":
    "The email address is already in use by another account",
};

const getErrorMessage = (errorCode) => {
  return errorMap[errorCode] || null;
};

const showToast = (errorMessage, duration, position) => {
  ToastAndroid.showWithGravity(
    errorMessage,
    duration || ToastAndroid.LONG,
    position || ToastAndroid.BOTTOM
  );
};

export { showToast, getErrorMessage };
