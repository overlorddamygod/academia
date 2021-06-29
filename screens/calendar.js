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
import { useTheme } from '@react-navigation/native';
import { color } from "react-native-reanimated";
const CalendarScreen = ({ navigation }) => {
  const todaysDate = new Date();
  const [date, setDate] = useState({
    year: todaysDate.getFullYear(),
    month: todaysDate.getMonth() + 1,
    date: todaysDate.getDate(),
    day: todaysDate.getDay(),
  });
  const { colors } = useTheme();
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
    setRefreshing(true);

    if (Object.keys(eventsCache).includes(dateKey) && !reset) {
      setEvents(eventsCache[dateKey]);
      setRefreshing(false);

      return;
    }

    const start = new Date(`${year}-${formatDate(month)}-01`);
    const end = addMonth(new Date(`${year}-${formatDate(month)}-01`), 1);

    console.log(start, end);
    firestore()
      .collection("announcementTemp")
      .where("date", ">=", start)
      .where("date", "<", end)
      .get()
      .then((doc) => {
        const fetchedEvents = doc.docs
          .map((d) => ({ ...d.data(), id: d.id }))
          .sort((a, b) => a.date - b.date);

        // const tempEvent = eventsCache;
        eventsCache[dateKey] = fetchedEvents;
        // console.log(eventsCache)
        setEventsCache(eventsCache);
        setEvents(eventsCache[dateKey]);
        setRefreshing(false);
      });
    setRefreshing(false);
  };

  const formatYmd = (date) => date.toDate().toISOString().slice(0, 10);

  const addDay = (t, range = 0) => {
    const d = t.toDate();
    return new Date(d.setDate(d.getDate() + range)).toISOString().slice(0, 10);
  };
  const addMonth = (d, range = 1) => {
    return new Date(d.setMonth(d.getMonth() + range));
  };

  useEffect(() => {
    console.log("EVENTS", events);
  }, [events]);

  return (
    <>
      <Header title="Calendar" navigation={navigation} showBackMenu={false} />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Calendar
          markingType={"period"}
          markedDates={{
            ...Object.values(eventsCache)
              .reduce((acc, _event) => {
                return [...acc, ..._event];
              }, [])
              .reduce((acc, e) => {
                const startingDate = e.date;
                if (e.range <= 0) {
                  acc[formatYmd(startingDate)] = {
                    dotColor: tagColor[e.tag || "Holiday"],
                    marked: true,
                  };
                } else {
                  for (let i = 0; i <= e.range; i++) {
                    acc[addDay(startingDate, i)] = {
                      startingDay: i == 0,
                      endingDay: i == e.range,
                      color: tagColor[e.tag || "Holiday"],
                    };
                  }
                }

                return acc;
              }, {}),
          }}
          enableSwipeMonths={true}
          onDayPress={(time) => {
            setDate(time);
            setAddEventDialog(true);
          }}
          onMonthChange={(time) => {
            console.log("MONTH CHANGED");
            setDate(time);
            getEventsForMonth(time.year, time.month);
          }}
          style={{ backgroundColor: colors.mainblue }}
          theme={{
            calendarBackground:  colors.mainblue,
            dayTextColor: COLORS.white,
            textDisabledColor: COLORS.grey,
            arrowColor: COLORS.white,
            monthTextColor: COLORS.white,
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "red",
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
                color: colors.text
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
              <Feather name="plus" color={colors.text} size={35}></Feather>
            </TouchableOpacity>
          </View>

          {events.length > 0 ? (
            <FlatList
              data={events}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => <CalendarEventListItem event={item} />}
            />
          ) : (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{colors:colors.text}}>No events for this month</Text>
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
        <AddEvent
          closeDialog={() => setAddEventDialog(false)}
          date={date.dateString}
        />
      </Dialog>
    </>
  );
};

export default CalendarScreen;

const CalendarEventListItem = ({ event }) => {
  const {colors} = useTheme();
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
            color:colors.text,
            borderRightColor: tagColor[event.tag],
          }}
        >
          {formatDate(event.date.toDate().getDate())}
        </Text>

        <Text style={{ fontSize: 16, flex: 1,color:colors.text }}>{event.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (date) => {
  return date < 10 ? `0${date}` : date;
};
