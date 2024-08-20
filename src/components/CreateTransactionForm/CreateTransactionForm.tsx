import { useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Invitation, UserEvent } from '../../types/models';
import { DateTimePicker } from '../DateTimePicker';
import Crypto from '../../lib/crypto';
import { Text } from '../Text';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import * as Contacts from 'expo-contacts';

interface CreateTransactionFormProps {
  onCreate: (event: UserEvent) => void;
}

export default function CreateTransactionForm({ onCreate }: CreateTransactionFormProps) {
  const { theme: { colors: { primary, greyOutline } } } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<{
    selected: boolean;
    contact: Contacts.Contact;
  }[]>([]);

  useEffect(() => {
    async function loadContact() {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== 'granted') {
        console.log('permission needed');
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
        ]
      });

      if (data.length) {
        setContacts(data.map((d) => ({
          contact: d,
          selected: false
        })));
      }
    }

    loadContact();
  }, []);

  const isValid = title && startDate && startTime;

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();

    const data: UserEvent = {
      uuid,
      title,
      description,
      status: "PENDING",
      invitations,
      startDateTime: '',
      endDateTime: '',
    };

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <ExpandingView>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text weight='700' style={{ fontSize: 18 }}>Create Event</Text>
        </Row>

        <TextInput label='Event name' onChangeText={setTitle} />
        <TextInput label='Event description' onChangeText={setDescription} />

        <Text weight='700' style={{ fontSize: 12 }}>Event Start</Text>
        <Row style={{ gap: 5 }}>
          <DateTimePicker label="Date" containerStyle={{ flexGrow: 1 }} date={startDate} onChange={setStartDate} mode="date" />
          <DateTimePicker label="Time" containerStyle={{ flexGrow: 1 }} date={startTime} onChange={setStartTime} mode="time" />
        </Row>

        <Text weight='700' style={{ fontSize: 12 }}>Event End</Text>
        <Row style={{ gap: 5 }}>
          <DateTimePicker label="Date" containerStyle={{ flexGrow: 1 }} date={endDate} onChange={setEndDate} mode="date" />
          <DateTimePicker label="Time" containerStyle={{ flexGrow: 1 }} date={endTime} onChange={setEndTime} mode="time" />
        </Row>

        <View style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: greyOutline,
          padding: 5
        }}>
          <Row style={{
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Text weight='700' style={{ fontSize: 12 }}>Invitations</Text>
            <Text weight='500' style={{ fontSize: 10, opacity: 0.5 }}>
              Select contacts you want to invite
            </Text>
          </Row>
          <TextInput label='Contact' placeholder='Search contact' onChangeText={setSearchTerm} />

          <ScrollView style={{ maxHeight: 200 }}>
            {contacts.map((contact) => (
              <View key={contact?.contact?.id} style={{
                borderWidth: 1,
                borderColor: greyOutline,
                borderRadius: 10,
                padding: 5,
                marginVertical: 1
              }}>
                <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Row>
                    <Text weight='500'>{contact?.contact?.name}</Text>
                  </Row>

                  <Row>
                    <TouchableOpacity>
                      <Text weight='700'>Invite</Text>
                    </TouchableOpacity>
                  </Row>
                </Row>
              </View>
            ))}
          </ScrollView>
        </View>

      </ExpandingView>

      <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
    </ExpandingView>
  );
}
