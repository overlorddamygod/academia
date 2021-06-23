import React, { useState } from "react";
import { Text, View, TextInput, Button,Switch } from "react-native";
import COLORS from "../styles/colors";
import { globalStyles } from "../styles/globalStyle";
import firestore from "@react-native-firebase/firestore";
import { sendNotification } from "../notifications";

const AddEvent = ({date, closeDialog}) => {
    const todaysDate = new Date();
    const [notificationData, setNotificationData ] = useState({
        send: false,
        topic: "All"
    })
    const [eventData, setEventData] = useState({
        title: "",
        tag: "",
        date: date || `${todaysDate.getFullYear()}-${todaysDate.getMonth()+1}-${todaysDate.getDate()}`
    });

    const submitEvent = () => {
        const [ year, month, _date ] = eventData.date.split("-").map(d=>+d)

        firestore().collection("announcement").add({
            title: eventData.title,
            tag: eventData.tag,
            // time: firestore.Timestamp.fromDate(new Date(eventData.date)),
            date: _date,
            year,
            month,
            createdAt: firestore.FieldValue.serverTimestamp()
        }).then(r=> {
            if ( notificationData.send ) {
                sendNotification({
                    title: eventData.title,
                    date: eventData.date,
                    topic: notificationData.title
                })
            }

            closeDialog();
        })
    }

  return (
    <View style={{ paddingHorizontal: 10,backgroundColor:COLORS.white,borderRadius:10 }}>
        <Text style={{fontWeight:"bold", marginVertical: 10,fontSize:30,textAlign: "center",color:COLORS.black}}>Add Event</Text>
        <Text>Title</Text>
        <TextInput
            value={eventData.title}
            style={{...globalStyles.input}}
            onChangeText={text=> {
                setEventData({...eventData,title:text})
            }}
        />
        <Text>Tag</Text>
        <TextInput
            value={eventData.tag}
            style={{...globalStyles.input}}
            onChangeText={text=> {
                setEventData({...eventData,tag:text})
            }}
        />
        <Text>Date</Text>
        <TextInput
            value={eventData.date}
            style={{...globalStyles.input}}
            onChangeText={text=> {
                setEventData({...eventData,date:text})
            }}
        />
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text>Send Notification</Text>
            <Switch value={notificationData.send} onValueChange={(val)=>setNotificationData({...notificationData,send:val})}/>
        </View>
        <Text>Topic</Text>
        <TextInput
            value={notificationData.topic}
            style={{...globalStyles.input}}
            onChangeText={text=> {
                setNotificationData({...notificationData,topic:text})
            }}
        />

        <View style={{marginVertical:20}}>
            <Button title="Add" onPress={submitEvent}></Button>
        </View>
    </View>
  );
};

export default AddEvent;

const tags = [
    "Exams",
    "Classes",
    "Holiday",
    "Result",
    "Project",
];
