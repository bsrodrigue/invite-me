import React, { useEffect, useState } from "react";
import {
  Button,
  CardBottomSheet,
  EditTransactionForm, ExpandingView,
  Row, Text
} from "../../components";
import { useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";
import * as Contacts from 'expo-contacts';
import { View } from "react-native";
import * as Crypto from "expo-crypto"
import * as Sharing from "expo-sharing";
import QRCode from "react-native-qrcode-svg";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import FS from "../../lib/fs";


interface Guest {
  hasAttended: boolean;
  contact: Contacts.Contact;
  hash: string;
}


export default function HomeScreen() {
  const { theme: { colors: { white, primary } } } = useTheme();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [qrCode, setQrCode] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [svg, setSvg] = useState(null);
  const [hashes, setHashes] = useState({});

  const openPhoneBook = async () => {
    const contact = await Contacts.presentContactPickerAsync();

    if (!contact) return;

    const data = `${contact.id}${contact.name}`;

    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data, {
      encoding: Crypto.CryptoEncoding.HEX,
    });

    hashes[hash] = {
      hasAttended: false,
      contact,
      hash,
    } as Guest;

    setHashes(hashes);

    setGuests([...guests, { hasAttended: false, contact, hash }]);
  }

  useEffect(() => {
    async function init() {
      const { status } = await Contacts.requestPermissionsAsync();

      requestPermission();

      if (status !== 'granted') {
        console.log('permission needed');
        return;
      }
    }

    init();
  }, []);

  return (
    <ExpandingView style={{ backgroundColor: white }}>
      {
        guests.map((guest) => (
          <View
            key={guest.contact.id}
            style={{
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              backgroundColor: "white"
            }}>
            <Row style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text weight="700">{guest.contact?.name}</Text>
              <Row style={{
                alignItems: "center",
                gap: 5
              }}>
                <Text>{guest.hasAttended ? "Validated" : "Not Yet"}</Text>
                <Button color="warning" onPress={() => setQrCode(guest.hash)}>View</Button>
                <Button color="blue" onPress={async () => {
                  if (!svg) return;
                  svg?.toDataURL(async (b64) => {
                    const url = await FS.saveFile('code.png', b64);
                    await Sharing.shareAsync(url, {
                      dialogTitle: "Send Invitation Code",
                    });
                  });

                }}>Share</Button>
              </Row>
            </Row>
          </View>
        ))
      }
      <FAB
        onPress={() =>
          openPhoneBook()
        }
        title="Add Guest"
        size="small" color={primary}
        placement="right" titleStyle={{ fontSize: 12, fontFamily: "font-700" }}
        style={{ zIndex: 100 }}
      />

      <CameraView
        style={{ flex: 0.5, margin: 10 }}
        onBarcodeScanned={({ data }) => {
          const guest = hashes[data];

          console.log(data)

          console.log(hashes)

          if (!guest) {
            console.error('not a guest');
            return;
          }

          guest.hasAttended = true;

          setGuests((prev) => {
            return prev.map((g) => (g.hash === data) ? guest : g);
          });
        }}
      >
      </CameraView>

      {
        (qrCode) && (
          <QRCode
            value={qrCode}
            size={50}
            getRef={(c) => {
              setSvg(c);
            }}
          />
        )
      }

      <CardBottomSheet
        isVisible={Boolean(editingTransaction)}
        onBackdropPress={() => setEditingTransaction(null)}
      >
        <EditTransactionForm
          transaction={editingTransaction}
          onEdit={() => {
            setEditingTransaction(null);
          }}
          onDelete={() => {
            setEditingTransaction(null);
          }}
        />
      </CardBottomSheet>
    </ExpandingView>
  );
}

