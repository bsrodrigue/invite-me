import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Button, CardBottomSheet, ExpandingView, HiddenQrCode, Row, Text } from "../../components"
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { FAB, Icon, useTheme } from "@rneui/themed";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Guest, UserEvent, UserEventStatus } from "../../types/models";
import FS from "../../lib/fs";
import * as Sharing from "expo-sharing";
import { useEventStore } from "../../stores";

type StatusUiData = {
  next?: UserEventStatus;
  buttonLabel?: string;
}

const EVENT_STATUS_FLOW: Record<UserEventStatus, StatusUiData[]> = {
  NOT_STARTED: [
    {
      next: 'ONGOING',
      buttonLabel: 'Start Event',
    },
  ],
  ONGOING: [
    // {
    //   next:
    //     'CANCELLED',
    //   buttonLabel: 'Cancel Event',
    // },
    {
      next:
        'DONE',
      buttonLabel: 'Finish Event',
    },
  ],
  PENDING: [
    {
      next: null
    },

  ],
  DONE: [
    {
      next: 'ARCHIVED',
      buttonLabel: 'Archive Event',
    },
  ],
  CANCELLED: [
    {
      next: 'ARCHIVED',
      buttonLabel: 'Archive Event',
    },

  ],
  ARCHIVED: [
    {
      next: null
    },
  ]
}

function resolveNextStatus(status: UserEventStatus) {
  return EVENT_STATUS_FLOW[status];
}

type EventDashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'EventDashboard'>;

export default function EventDashboardScreen({ navigation, route }: EventDashboardScreenProps) {
  const [event, setEvent] = useState(route.params.event);
  const { theme: { colors: { white, primary, black, greyOutline, success, error, warning } } } = useTheme();
  const height = Dimensions.get('window').height;
  const { update } = useEventStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanIsOpen, setScanIsOpen] = useState(false);
  const [scanMessage, setScanMessage] = useState('Scan Invitation Code');
  const [scanStatus, setScanStatus] = useState('normal');
  const [hashes, setHashes] = useState<Record<string, Guest>>({});
  const [svgs, setSvgs] = useState<Record<string, any>>({});

  const scanStatusColors = {
    "normal": black,
    "success": success,
    "warning": warning,
    "error": error,
  }

  const onPress = (status?: UserEventStatus) => {
    if (!status) return;

    const e: UserEvent = { ...event, status };
    setEvent(e);
    update(e);
  }

  useEffect(() => {
    switch (event.status) {
      case "NOT_STARTED":
        break;
      case "PENDING":
        break;
      case "ONGOING":
        break;
      case "DONE":
        break;
      case "CANCELLED":
        break;
      case "ARCHIVED":
        break;
      default:
        break;
    }
  }, [event.status]);

  const guests = Object.values(hashes) ?? [];

  const statusUiData = resolveNextStatus(event.status);

  const checkDisabled = () => {
    let disabled = false;
    switch (event.status) {
      case "NOT_STARTED":
        disabled = (guests.length === 0);
        break;
      case "PENDING":
        break;
      case "ONGOING":
        break;
      case "DONE":
        break;
      case "CANCELLED":
        break;
      case "ARCHIVED":
        break;
      default:
        break;
    }

    return disabled;
  }

  const canScan = (event.status === 'ONGOING');
  const disabled = checkDisabled();

  function shareQrCode(svg: any) {
    svg?.toDataURL(async (b64) => {
      const url = await FS.saveFile('code.png', b64);
      await Sharing.shareAsync(url, {
        dialogTitle: "Send Invitation Code",
      });
    });

  }

  useEffect(() => {
    async function init() {
      requestPermission();
    }

    init();

    const hashes = {};

    event?.guests?.forEach((guest) => {
      hashes[guest.hash] = guest;
    });

    setHashes(hashes);

  }, [event]);

  return (
    <ExpandingView style={{
      paddingVertical: 10,
      paddingHorizontal: 20,
    }}>
      <Row style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        <Text weight="700" style={{
          fontSize: 34,
        }}>{`${event.title}`}</Text>
        <Text weight="300" style={{
          fontSize: 24,
          opacity: 0.5,
        }}>{`${event.status}`}</Text>
      </Row>

      <Text weight="500" style={{
        fontSize: 20,
      }}>{`You have invited ${event?.guests?.length} guests`}</Text>

      <ExpandingView style={{
        marginVertical: 10,
        justifyContent: "space-between"
      }}>
        <View>
          {
            guests?.map((guest, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const svg = svgs[guest.hash];

                  svg && shareQrCode(svg);
                }}
                style={{
                  padding: 5,
                  marginVertical: 1,
                }}>
                <HiddenQrCode code={guest.hash} onSetSvg={(svg) => {
                  svgs[guest.hash] = svg;
                  setSvgs(svgs);
                }} />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text weight="500">{guest.fullname}</Text>
                  <Row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{
                      height: 10,
                      aspectRatio: 1,
                      backgroundColor: guest.hasAttended ? success : greyOutline,
                      borderRadius: 50
                    }} />
                  </Row>
                </Row>
              </TouchableOpacity>
            ))
          }
        </View>
        {
          (statusUiData.length !== 0) &&
          (
            <Row style={{ gap: 5 }}>
              {
                statusUiData.map((uiData, index) => (
                  <View
                    style={{
                      flexGrow: 1
                    }}
                    key={index}>
                    {uiData?.next && (
                      <Button
                        disabled={disabled}
                        onPress={
                          () => {
                            onPress(uiData.next)
                          }
                        }>{uiData.buttonLabel}</Button>
                    )}
                  </View>
                )
                )
              }
            </Row>
          )
        }
      </ExpandingView>

      <FAB
        visible={canScan}
        onPress={() =>
          setScanIsOpen(true)
        }
        icon={<Icon name="qrcode" type="antdesign" />}
        color={white}
        placement="right"
      />

      <CardBottomSheet
        isVisible={scanIsOpen}
        onBackdropPress={() => {
          setScanIsOpen(false);
        }}
        style={{
          borderTopStartRadius: 0,
          borderTopEndRadius: 0,
          paddingHorizontal: 0,
          padding: 0
        }}
      >
        <View style={{
          height: (height * 0.9)
        }}>
          <CameraView
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
            onBarcodeScanned={({ data }) => {
              const guest = hashes[data];

              function reset() {
                setScanMessage('Scan Invitation Code');
                setScanIsOpen(false);
                setScanStatus('normal');

              }

              if (!guest) {
                setScanMessage('Invalid Code');
                setScanStatus('error');
                setTimeout(() => {
                  reset();
                }, 1000);
                return;
              }

              if (guest.hasAttended) {
                setScanMessage('Already Checked In');
                setScanStatus('warning');
                setTimeout(() => {
                  reset();
                }, 1000);
                return;
              }

              guest.hasAttended = true;
              reset();
            }}
          >
            <View style={{ backgroundColor: scanStatusColors[scanStatus] }}>
              <Text weight="700" style={{
                color: white,
                textAlign: "center"
              }}>{scanMessage}</Text>
            </View>
          </CameraView>
        </View>

      </CardBottomSheet>

    </ExpandingView>
  )
}
