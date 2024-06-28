import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;

async function getDirectoryUri() {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permissions.granted) {
    return permissions.directoryUri;
  } else {
    alert("You must allow permission to save.");
    return null;
  }
}

// Variable to store the file URI, so we don't need to recreate it
let fileUri:any = null;

export const saveFile = async (data:any, fileName = "data.json") => {
  const directoryUri = await getDirectoryUri();
  if (directoryUri) {
    try {
      // Create the file only if it hasn't been created yet
      if (!fileUri) {
        fileUri = await StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          "application/json"
        );
      }

      // Write data to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log(`File saved at: ${fileUri}`);
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }
};

export const getFile = async (fileName = "data.json") => {
  const directoryUri = await getDirectoryUri();
  if (directoryUri) {
    try {
      // Create the file only if it hasn't been created yet
      if (!fileUri) {
        fileUri = await StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          "application/json"
        );
      }

      const fileData = await FileSystem.readAsStringAsync(fileUri);
      const jsonData = JSON.parse(fileData);
      return jsonData;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  } else {
    return null;
  }
};