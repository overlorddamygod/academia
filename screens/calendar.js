import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import COLORS, { tagColor } from "../styles/colors";
import { Dialog } from "react-native-ui-lib";
import { Feather } from "@expo/vector-icons";
import AddEvent from "../components/AddEvent";
import { SIZE } from "../styles/globalStyle";

const CalendarScreen = ({ navigation }) => {
  const todaysDate = new Date();
  const [date, setDate] = useState({
    year: todaysDate.getFullYear(),
    month: todaysDate.getMonth() + 1,
    date: todaysDate.getDate(),
    day: todaysDate.getDay(),
  });

  const [eventsCache, setEventsCache] = useState({});
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [addEventDialog, setAddEventDialog] = useState(false);

  const onRefresh = React.useCallback(() => {
    getEventsForMonth(date.year, date.month, true);
  }, [date]);

  useEffect(() => {
    getEventsForMonth(date.year, date.month);
  }, []);


  const getEventsForMonth = (year, month, reset = false) => {
    const dateKey = `${year}-${month}`;
    setRefreshing(true)

    if (Object.keys(eventsCache).includes(dateKey) && !reset) {
      setEvents(eventsCache[dateKey]);
      setRefreshing(false)

      return;
    }
    firestore()
      .collection("announcement")
      .where("year", "==", +year)
      .where("month", "==", +month)
      .get()
      .then((doc) => {
        const fetchedEvents = doc.docs.map((d) => ({...d.data(),id:d.id})).sort((a,b)=>a.date-b.date);
  
        // const tempEvent = eventsCache;
        eventsCache[dateKey] = fetchedEvents;
        setEventsCache(eventsCache);
        setEvents(eventsCache[dateKey]);
        setRefreshing(false)
      });
      setRefreshing(false)
  };

  return (
    <>
      <Header title="Calendar" navigation={navigation} showBackMenu={false} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Calendar
          minDate={"2020-01-01"}
          maxDate={"2030-01-01"}
          markedDates={events.reduce((acc, e) => {
            const _date = `${e.year}-${formatDate(e.month)}-${
              e.date
            }`;
            acc[_date] = {
              dotColor: tagColor[e.tag || "Holiday"],
              marked: true,
            };
            return acc;
          }, {})}
          enableSwipeMonths={true}
          onDayPress={(time) => {
            setDate(time)
            setAddEventDialog(true);
          }}
          
          onMonthChange={(time) => {
            console.log("MONTH CHANGED")
            setDate(time);
            getEventsForMonth(time.year, time.month);
          }}
          style={{ backgroundColor: COLORS.main }}
          theme={{
            calendarBackground: COLORS.main,
            dayTextColor: COLORS.white,
            textDisabledColor: COLORS.grey,
            arrowColor: COLORS.white,
            monthTextColor: COLORS.white,
            "stylesheet.calendar.header":{
              dayTextAtIndex0: {
                color: 'red'
              },
            },
          }}
        />
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              Events
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ borderWidth: 1, borderRadius: 5 }}
              onPress={() => {
                setAddEventDialog(true);
                console.log("Add Event");
              }}
            >
              <Feather name="plus" color={COLORS.black} size={35}></Feather>
            </TouchableOpacity>
          </View>

          {events.length > 0 ? (
            <FlatList
              data={events}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <CalendarEventListItem event={item} />
              )}
            />
          ) : (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text>No events for this month</Text>
            </View>
          )}
        </View>
      </View>
      <Dialog
        migrate
        useSafeArea
        containerStyle={{
          justifyContent: "space-between",
          paddingVertical: 20,
          addingHorizontal: 30,
          paddingHorizontal: 40,
        }}
        width="100%"
        visible={addEventDialog}
        onDismiss={() => setAddEventDialog(false)}
      >
        <AddEvent closeDialog={()=>setAddEventDialog(false)} date={date.dateString}/>
      </Dialog>
    </>
  );
};

export default CalendarScreen;

const CalendarEventListItem = ({ event }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              paddingRight: 10,
              marginRight: 10,
              borderRightWidth: 3,
              borderRightColor: tagColor[event.tag],
            }}
          >
            {formatDate(event.date)}
          </Text>

        <Text style={{ fontSize: 16, flex: 1 }}>{event.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (date) => {
  return date < 10 ? `0${date}` : date
}
