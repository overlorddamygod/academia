import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import Video from "react-native-video";
import GalleryRoute from "../components/GalleryRoute";
import Header from "../components/Header";
import useGallery from "../hooks/useGallery";
import COLORS from "../styles/colors";
import { globalStyles, SIZE } from "../styles/globalStyle";
import { showToast } from "../utils/error";
import { WebView } from "react-native-webview";

const videoLinks = [
  "https://www.youtube.com/embed/EQMVuQvat-c",
  "https://www.youtube.com/embed/o6cCTwLTPbM",
  "https://www.youtube.com/embed/K4TiqJRfVJ4",
  "https://www.youtube.com/embed/UB_XB_VIj6A",
  "https://www.youtube.com/embed/VcFgE3xablo",
  "https://www.youtube.com/embed/FllfavYZVyg",
  "https://www.youtube.com/embed/TIPepqphlg0",
  "https://www.youtube.com/embed/JZG3sNywrzA",
];

const Videos = ({ navigation }) => {
  const videoPlayer = useRef(null);
  const [currIndex, setCurrIndex] = useState(null);
  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [screenType, setScreenType] = useState("content");
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const {
    fetchData,
    uploadData,
    uploading,
    loading,
    // deleteData,
    // refreshing,
  } = useGallery(setVideo, setAllVideos);

  useEffect(() => {
    fetchData("videos");
  }, []);
  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert("Oh! ", error);

  const exitFullScreen = () => {
    alert("Exit full screen");
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == "content") setScreenType("cover");
    else setScreenType("content");
  };
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  const openGallery = () => {
    const options = {
      title: "Video Picker",
      mediaType: "video",
      storageOptions: {
        skipBackup: true,
        path: "videos",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(response);
        setVideo({ uri: source });
      }
    });
  };
  console.log(allVideos);
  console.log(SIZE.screenWidth, SIZE.screenWidth * 0.5625);
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Academia Video"
        navigation={navigation}
        showSidebar={false}
      />
      <GalleryRoute navigation={navigation} screen="video" />

      {/* <TouchableOpacity
  activeOpacity={0.7}
  style={globalStyles.btns}
  onPress={openGallery}
>
  <Text style={{ color: "white" }}>Add Video</Text>
</TouchableOpacity> */}
      <ScrollView style={{ height: 1000, backgroundColor: "yellow" }}>
        {/* <View style={{ backgroundColor: "red", flex: 1 }}> */}
        {videoLinks.map((link, index) => (
          <WebView
            style={{ height: SIZE.screenWidth * 0.5625 }}
            key={index}
            source={{
              html: `<iframe
          width="100%"
        height="100%"
        src="${link}"
        title="YouTube video player"
        frameborder="0"
        allowFullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>`,
            }}
          />
        ))}
        {/* </View> */}
      </ScrollView>

      {/* {loading && <ActivityIndicator color="#f44"/>} */}
      {/* {!video && (
        <>

        </>
      )}
      {video && (
        <View style={{ ...globalStyles.container, flex: 1 }}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoPlayer}
            resizeMode={screenType}
            onFullScreen={isFullScreen}
            source={video}
            // poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
            style={styles.mediaPlayer}
            volume={10}
          />
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor="#333"
            onFullScreen={onFullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
            toolbar={renderToolbar()}
          />
          <View
            style={{
              marginTop: SIZE.screenHeight * 0.6,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={globalStyles.btns}
              onPress={() => uploadData("videos", video)}
            >
              <Text style={{ color: "white" }}>
                {uploading ? (
                  <ActivityIndicator color="white" size={24} />
                ) : (
                  "Upload"
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...globalStyles.btns,
                backgroundColor: COLORS.mainred,
                marginLeft: 3,
              }}
              onPress={() => setVideo(null)}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView>
        {!video && (
          <View>
            {allVideos.map((video, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  index === currIndex ? null : setCurrIndex(index);
                }}
              >
                <Video
                  source={{ uri: video }}
                  style={styles.backgroundVideo}
                  onEnd={onEnd}
                  onLoad={onLoad}
                  onLoadStart={onLoadStart}
                  onProgress={onProgress}
                  paused={currIndex === index ? true : false}
                  ref={videoPlayer}
                  resizeMode={screenType}
                  onFullScreen={isFullScreen}
                  // onEnd={() => showToast("Video Ended")}
                  poster="https://academiacollege.edu.np/img/landing.jpg"
                />

                <MediaControls
                  duration={duration}
                  isLoading={isLoading}
                  mainColor="#333"
                  onFullScreen={onFullScreen}
                  onPaused={onPaused}
                  onReplay={onReplay}
                  onSeek={onSeek}
                  onSeeking={onSeeking}
                  playerState={playerState}
                  progress={currentTime}
                  toolbar={renderToolbar()}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView> */}
    </View>
  );
};

export default Videos;
var styles = StyleSheet.create({
  backgroundVideo: {
    width: SIZE.screenWidth,
    height: 300,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
    marginTop: 80,
  },
});
