import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from "@/components/Themed";
import { createData, storage } from "@/components/store/store";

export default function TabOneScreen() {
  const logSpace = () => {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  };
  const handlePressGet = async () => {
    logSpace();
    console.log("invoke fn handlePressGet Start");
    await storage.getString("name");
    console.log("invoke fn handlePressGet End ");
  };
  const handlePressSave = async () => {
    logSpace();
    console.log("invoke fn handlePressSave Start");
    await storage.set("name", "new name 101");
    console.log("invoke fn handlePressSave End");
  };
  const handlePressCreateData = async () => {
    logSpace();
    createData([]);
  };
  return (
    <View style={styles.container}>
      <Text className="text-rose-400">Custom text</Text>
      <TouchableOpacity onPress={handlePressCreateData}>
        <Text>Set []</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressGet}>
        <Text>Get Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressSave}>
        <Text>Save Data</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
