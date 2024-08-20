import * as FileSystem from 'expo-file-system';

export default class FS {
  static DOC_DIR = FileSystem.documentDirectory;



  static async saveFile(filename: string, content: string, encoding: FileSystem.EncodingType = FileSystem.EncodingType.Base64) {
    const uri = `${FS.DOC_DIR}${filename}`;
    await FileSystem.writeAsStringAsync(uri, content,
      {
        encoding,
      }
    );
    return uri;
  }

  static async readFile(filename: string) {
    const uri = `${FS.DOC_DIR}${filename}`;
    return FileSystem.readAsStringAsync(uri);
  }

}
