import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import FS from "../lib/fs";

interface ImagePickerProps {
  fileName?: string;
}

export default function useImagePicker({ fileName }: ImagePickerProps) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [imgUri, setImgUri] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const handlePermission = async () => {
    const response = await requestPermission();
    return response.granted;
  }

  const pickImage = async (aspect: [number, number] = [1, 1]) => {
    if (!status.granted && ! await handlePermission()) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.5,
      base64: true
    })

    if (result.canceled) return;

    const b64 = result.assets[0].base64;
    const uri =
      (fileName) ? await FS.saveFile(fileName, b64) : result.assets[0].uri;

    setImgUri(uri);
    setImgBase64(b64);
  }

  return { imgUri, imgBase64, pickImage };
}
