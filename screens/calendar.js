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
  const [showDialog, setShowDialog] = useState(false);

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
        const fetchedEvents = doc.docs.map((d) => d.data()).sort((a,b)=>a.date-b.date);
        const tempEvent = eventsCache;
        tempEvent[dateKey] = fetchedEvents;
        setEventsCache(tempEvent);
        setEvents(eventsCache[dateKey]);
        setRefreshing(false)
      });
      setRefreshing(false)

  };
  return (
    <>
      <Header title="Calendar" navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: "#4C367B",
          }}
        ></View> */}
        <Calendar
          // current={`${date.year}-${date.month}-${date.date}`}
          minDate={"2020-01-01"}
          maxDate={"2030-01-01"}
          markedDates={events.reduce((acc, e) => {
            const _date = `${e.year}-${e.month < 10 ? `0${e.month}` : e.month}-${
              e._date
            }`;
            acc[date] = {
              dotColor: tagColor[e.tag || "Holiday"],
              marked: true,
            };
            return acc;
          }, {})}
          enableSwipeMonths={true}
          onDayPress={(a) => {

            // setDate(a)
            // setShowDialog(true);

          }}
          onMonthChange={(d) => {
              console.log("MONTH CHANGED")
            setDate(d);
            getEventsForMonth(d.year, d.month);
          }}
          style={{ backgroundColor: COLORS.main }}
          theme={{
            // backgroundColor: COLORS.main,
            calendarBackground: COLORS.main,
            dayTextColor: "white",
            textDisabledColor: "grey",
            arrowColor: "white",
            monthTextColor: "white",
            selectedDayBackgroundColor: "red",
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
                color: "black",
              }}
            >
              Events
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ borderWidth: 1, borderRadius: 5 }}
              onPress={() => {
                setShowDialog(true);
                console.log("Add Event");
              }}
            >
              <Feather name="plus" color="black" size={35}></Feather>
            </TouchableOpacity>
          </View>

          {events.length > 0 ? (
            <FlatList
              data={events}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => `${item.date}`}
              renderItem={({ item }) => (
                <CalendarEventListItem event={item} key={item.date} />
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
        visible={showDialog}
        onDismiss={() => setShowDialog(false)}
      >
        <AddEvent closeDialog={()=>setShowDialog(false)} date={date.dateString}/>
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
        key={event.date}
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
          {event.date}
        </Text>
        <Text style={{ fontSize: 16, flex: 1 }}>{event.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
