import React, { } from "react";
import {
  CenteringView,
  ExpandingView,
  Row,
  Text
} from "../../components";
import { Icon, useTheme } from "@rneui/themed";
import { useEventStore } from "../../stores";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import weddingCover from "../../assets/images/covers/wedding.jpg";
import { UserEvent } from "../../types/models";
import { FlatList } from "react-native";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const { theme: { colors: { white, primary, greyOutline, black } } } = useTheme();
  const { items: events } = useEventStore();
  const windowWidth = Dimensions.get('window').width

  const ongoingEvents = events?.filter((event) => event.status === 'ONGOING');

  return (
    <ExpandingView style={{ backgroundColor: white }}>
      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}>
        <Text style={{
          fontSize: 28
        }} weight="700">Organize your best events</Text>
        <Text style={{
          fontSize: 14,
          opacity: 0.5
        }} weight="500">
          Create and manage all your events and guests with ease.
        </Text>
      </View>
      {
        ongoingEvents.length === 0 && (
          <CenteringView>
            <View style={{ opacity: 0.5 }}>
              <Icon size={50} name="event" type="material" color={black} />
              <Text weight="700" style={{ marginTop: 10 }}>No Events On going...</Text>
            </View>
          </CenteringView>
        )
      }
      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}>
        <Row style={{
          marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Text weight="700" style={{
            fontSize: 14
          }}>Ongoing Events</Text>
          <Text weight="500" style={{
            fontSize: 12,
            opacity: 0.5
          }}>See all</Text>
        </Row>
      </View>
      <View>
        <FlatList
          data={ongoingEvents}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={(event) => {
                navigation.push('EventDashboard', {
                  event,
                })
              }} />

          )}
        />
      </View>
    </ExpandingView>
  );
}

interface EventCardProps {
  event: UserEvent;
  onPress?: (event: UserEvent) => void;
}

function EventCard({ event, onPress }: EventCardProps) {
  const { theme: { colors: { white, primary, greyOutline, black } } } = useTheme();
  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(event);
      }}
      key={event.uuid}
      style={{
        borderRadius: 10,
        padding: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: greyOutline,
        width: (windowWidth * 0.9),
        height: (windowHeight * 0.3),
        marginHorizontal: 5
      }}>
      <View style={{
        flex: 1
      }}>
        <View
          style={{
            borderRadius: 5,
            position: "relative",
            flex: 1
          }}
        >
          <Image
            source={weddingCover}
            contentFit="cover"
            style={{
              height: "100%",
              borderRadius: 5,
            }}
          />
          <View style={{ position: "absolute" }}>
          </View>
        </View>
        <View style={{
          paddingHorizontal: 5
        }}>
          <Row style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Text weight="700" style={{
              fontSize: 14,
            }}>{event.title}</Text>

            <Text
              weight="600"
              style={{
                opacity: 0.7,
              }}
            >{event.guests.length} Guests</Text>
          </Row>
        </View>
      </View>
    </TouchableOpacity>

  )
}

