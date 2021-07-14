import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';



const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'white' : '#999';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{color:'#fff',fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{color:'#fff',fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{color:'#fff',fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const Onboard = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() =>navigation.navigate("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#6765c2',
            image: <Image source={require('../images/logo.png')} />,
            title: 'Academia International College',
            subtitle: 'Best Institute In The Valley',
          },
          {
            backgroundColor: '#6765c2',
            image: <Image source={require('../images/logo.png')} />,
            title: 'Be Creative',
            subtitle: 'Share Your Knowledge With Others',
          },
          {
            backgroundColor: '#6765c2',
            image: <Image source={require('../images/logo.png')} />,
            title: 'Show The Future',
            subtitle: "Ride With Us In This Journey",
          },
        ]}
      />
    );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});