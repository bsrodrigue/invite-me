import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Guest, UserEvent } from '../../types/models';
import Crypto from '../../lib/crypto';
import { Text } from '../Text';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import * as Contacts from 'expo-contacts';
import * as ExpoCrypto from 'expo-crypto';
import { ToggleButton } from '../ToggleButton';
import { notify } from '../../lib';

interface EventFormProps {
  event?: UserEvent;
  onCreate: (event: UserEvent) => void;
  onEdit: (event: Partial<UserEvent>) => void;
  onDelete: (uuid: string) => void;
}

export default function EventForm({ event, onCreate, onEdit, onDelete }: EventFormProps) {
  const { theme: { colors: { primary, greyOutline, error } } } = useTheme();
  const [title, setTitle] = useState(event?.title ?? "");
  const [guests, setGuests] = useState<Guest[]>(event?.guests ?? []);
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);

  const uuid = event?.uuid ?? Crypto.generateRandomUUID();

  const openPhoneBook = async () => {
    const contact = await Contacts.presentContactPickerAsync();

    if (!contact)
      return;

    // TODO: Handle email guests later
    // const email = contact.emails[0]?.email;

    if (!contact.phoneNumbers[0]?.number.replace(/\s+/g, '')) {
      notify.error("Contact does not have phone number");
      return;
    }

    let phone = null;
    for (const phoneNumber of contact.phoneNumbers) {
      const numberStr = phoneNumber.number.replace(/\s+/g, '');
      const phoneAlreadyUsed = guests.find((guest) => guest.phoneNumber.replace(/\s+/g, '') === numberStr);

      if (!phoneAlreadyUsed) {
        phone = numberStr;
        break;
      }
    }

    if (!phone) {
      notify.error("Phone number already used");
      return;
    }

    const name = contact.name;

    const data = `${name}${phone}${uuid}`;

    const hash = await ExpoCrypto.digestStringAsync(
      ExpoCrypto.CryptoDigestAlgorithm.SHA256,
      data,
      {
        encoding: ExpoCrypto.CryptoEncoding.HEX,
      });

    setGuests([...guests, { hasAttended: false, phoneNumber: phone, fullname: name, hash }]);
  }

  const isValid = title

  const onSubmit = () => {
    if (Boolean(event)) {
      onEdit(Object.assign(event, { title, guests, uuid }));
      return;
    }

    const data: UserEvent = {
      uuid,
      title,
      status: 'NOT_STARTED',
      guests,
    };

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <ExpandingView>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text weight='700' style={{ fontSize: 18 }}>Create Event</Text>
          <ToggleButton onChange={setOptionsAreVisible} />
        </Row>

        <TextInput label='Event name' onChangeText={setTitle} defaultValue={title} />

        <View style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: greyOutline,
          paddingTop: 5,
          paddingHorizontal: 5
        }}>
          <Row style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <Text weight='700' style={{ fontSize: 12 }}>Invitations</Text>
            <Text weight='700' style={{ fontSize: 10, opacity: 0.5 }}>
              {`${guests.length} guests`}
            </Text>
          </Row>

          <ScrollView
            style={{
              maxHeight: 200,
            }}>
            {guests.map((guest) => (
              <View key={guest?.hash} style={{
                padding: 5,
                marginVertical: 1
              }}>
                <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Row>
                    <Text weight='500'>{`${guest?.fullname} (${guest?.phoneNumber})`}</Text>
                  </Row>

                  <Row>
                    <TouchableOpacity
                      onPress={() => setGuests(guests.filter((g) => g?.hash !== guest?.hash))}
                    >
                      <Text style={{
                        color: error
                      }} weight='700'>Remove</Text>
                    </TouchableOpacity>
                  </Row>
                </Row>
              </View>
            ))}
          </ScrollView>
          <Button size='sm' onPress={openPhoneBook} title="Add guest" />
        </View>
      </ExpandingView>

      {
        optionsAreVisible && (event) && (
          <ExpandingView>
            <Button
              color={error}
              onPress={() => {
                onDelete(event.uuid);
              }} title="Delete" />
          </ExpandingView>
        )
      }

      <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
    </ExpandingView>
  );
}
