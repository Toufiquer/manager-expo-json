import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { createData, getFile, readData, saveFile } from '@/components/store/store';

export default function TabOneScreen() {
const data = { name: "John Doe", age: 33 };
// saveFile(data, "userData.json"); // Save data to a file named userData.json
createData(data)
const handlePress = () => {
  // getFile("userData.json").then((jsonData) => {
  //   console.log("Retrieved data:", jsonData); // Print retrieved data from the file
  // });
  readData()

}
  return (
    <View style={styles.container}>
      <Text className='text-rose-400'>Custom text</Text>
      <TouchableOpacity onPress={handlePress}><Text>Get Data</Text></TouchableOpacity>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
