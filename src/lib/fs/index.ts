import * as FileSystem from 'expo-file-system';

export default class FS {
  static DOC_DIR = FileSystem.documentDirectory;

  static async saveFile(filename: string, content: string) {
    const uri = `${FS.DOC_DIR}${filename}`;
    await FileSystem.writeAsStringAsync(uri, content, {
      encoding: FileSystem.EncodingType.Base64
    });
    return uri;
  }

  static async readFile(filename: string) {
    const uri = `${FS.DOC_DIR}${filename}`;
    return FileSystem.readAsStringAsync(uri);
  }

}
