import QRCode from "react-native-qrcode-svg";
import { View, Dimensions } from 'react-native'

interface HiddenQrCodeProps {
  code: string;
  onSetSvg: (svg: any) => void;
}

export default function HiddenQrCode({ code, onSetSvg }: HiddenQrCodeProps) {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  return (
    <View>
      {
        (code) && (
          <View style={{
            position: "absolute",
            bottom: - (height * 100),
            right: - (width * 100),
          }}>
            <QRCode
              value={code}
              size={200}
              getRef={(c) => {
                onSetSvg(c);
              }}
            />
          </View>
        )
      }
    </View>
  );
}
