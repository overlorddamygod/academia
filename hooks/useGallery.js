import storage from "@react-native-firebase/storage";
import { useState } from "react";
import { showToast } from "../utils/error";

const useGallery = (setData, setAllData) => {
  const [option, setOption] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const fetchData = (name) => {
    const ref = storage().ref(`${name}`);
    ref.list().then((res) => {
      setAllData([]);
      res.items.forEach((itemsRef) => {
        itemsRef.getDownloadURL().then((downloadUrl) => {
          console.log(downloadUrl);
          setAllData((prev) => [...prev, downloadUrl]);
          setLoading(false);
          setRefreshing(false);
        });
      });
    });
  };

  const uploadData = async (dataHead, data) => {
    const { uri } = data;
    const filename = `${dataHead}/` + uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    setUploading(true);
    const task = storage().ref(filename).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      // console.error(e);
    }
    setUploading(false);
    showToast("Image was successfully Uploaded !");
    setData(null);
    setAllData((prev) => [uri, ...prev]);
    setOption(false);
  };

  const deleteData = (val) => {
    var desertRef = storage().refFromURL(val);
    desertRef.delete();
    setIsVisible(false);
    setAllData((prev) => prev.filter((a) => a !== val));
    showToast("Successfully deleted !");
  };

  return {
    uploadData,
    deleteData,
    fetchData,
    uploading,
    setUploading,
    setOption,
    option,
    loading,
    refreshing,
    visible,
    setIsVisible,
  };
};

export default useGallery;
