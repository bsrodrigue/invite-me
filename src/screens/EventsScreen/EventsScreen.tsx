import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import {
  CardBottomSheet, EventForm, ExpandingView,
  Row, ScreenDivider, TextInput
} from "../../components"
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FAB, Icon, useTheme } from "@rneui/themed";
import { Text } from "../../components";
import { useEventStore } from "../../stores";

type EventsScreenProps = NativeStackScreenProps<RootStackParamList, 'Events'>;

export default function EventsScreen({ navigation, route }: EventsScreenProps) {
  const { theme: { colors: { white, primary } } } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [sorting, setSorting] = useState("Newest");
  const { items: events, create: createEvent, remove: removeEvent, update: updateEvent } = useEventStore();

  const sortingsTypes = {
    "Newest": "descending",
    "Oldest": "ascending",
  }

  return (
    <ExpandingView >
      <FAB
        onPress={() => {
          setFormIsOpen(true);
        }}
        title="Add Event"
        size="small" color={primary}
        placement="right" titleStyle={{ fontSize: 12, fontFamily: "font-700" }}
        style={{ zIndex: 100 }}
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => setSorting(sorting === "Newest" ? "Oldest" : "Newest")}
          style={{ opacity: 0.5 }}>
          <Row style={{ alignItems: "center", gap: 5 }}>
            <Text weight="700">{`Sort by ${sorting}`}</Text>
            <Icon type="material-community" name={`sort-clock-${sortingsTypes[sorting]}`} />
          </Row>
        </TouchableOpacity>
        {
          events.map((event, index) => (
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => {
                navigation.push('EventDashboard', {
                  event,
                })
              }}
              onLongPress={() => {
                setEditingEvent(event);
                setFormIsOpen(true);
              }}
              key={index}>
              <Row style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Text weight="700">{event.title}</Text>
                <Text>{event.guests.length} guests</Text>
              </Row>
            </TouchableOpacity>
          ))
        }
        <View style={{ paddingTop: 10 }}>
          <TextInput placeholder={`Search for events...`} onChangeText={setSearchTerm} />
        </View>
      </View>

      <CardBottomSheet
        isVisible={formIsOpen}
        onBackdropPress={() => {
          setFormIsOpen(false);
          setEditingEvent(null);
        }}
      >
        <EventForm
          event={editingEvent}
          onCreate={(event) => {
            createEvent(event);
            setFormIsOpen(false);
          }}
          onEdit={(event) => {
            updateEvent(event);
            setFormIsOpen(false);
            setEditingEvent(null);
          }}
          onDelete={(uuid) => {
            removeEvent(uuid);
            setFormIsOpen(false);
            setEditingEvent(null);
          }}
        />
      </CardBottomSheet>


    </ExpandingView>
  )
}
