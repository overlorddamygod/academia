import React from 'react'
import { View, Text } from 'react-native'
import GalleryRoute from '../components/GalleryRoute'
import Header from '../components/Header'
import { globalStyles } from '../styles/globalStyle'

const Video = ({navigation}) => {
    return (
        <>
      <Header title="Academia Video" navigation={navigation} />
      <GalleryRoute navigation={navigation} screen="video"/>
        <View style={globalStyles.container}>
            <Text style={globalStyles.boldText}>Video</Text>
        </View>
        </>
    )
}

export default Video
