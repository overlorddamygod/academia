import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../styles/globalStyle'

const Subject = ({route,navigation}) => {
    // const {sem} = route.params;
    console.log(route)
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.midText}>Subject Bitch</Text>
        </View>
    )
}

export default Subject
