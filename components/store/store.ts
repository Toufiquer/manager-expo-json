import * as FileSystem from 'expo-file-system';

const data = { name: "John Doe", age: 30 };
const filePath = FileSystem.documentDirectory + 'myData.json';


export const createData = async (data: any = []) => {
  FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

export const   readData=async()=> {
  try {
    const filePath = FileSystem.documentDirectory + 'myData.json';
    const fileData = await FileSystem.readAsStringAsync(filePath);
    const jsonData = JSON.parse(fileData);

    console.log("Retrieved data:", jsonData); 

    return jsonData; // You can use this data as needed
  } catch (error) {
    console.error("Error reading file:", error);
  }
}