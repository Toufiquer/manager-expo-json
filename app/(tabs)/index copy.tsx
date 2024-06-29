import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from "@/components/Themed";
import { createData, storage } from "@/components/store/store";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    console.log("");
    console.log("");
    console.log("");
    console.log("Fetching data start ");
    console.log(
      "process.env.EXPO_PUBLIC_API_URL",
      process.env.EXPO_PUBLIC_API_URL
    );
    const fetchData = await fetch(process.env.EXPO_PUBLIC_API_URL as string);
    console.log("fetch data :", fetchData);
    console.log("Fetching data end ");
  };
  useEffect(() => {
    setIsLoading(true);
    console.log("use effect invoked STart");
    fetchData();
    try {
      fetch(process.env.EXPO_PUBLIC_API_URL as string)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.content?.a) {
            delete data.content.a;
            delete data?.content?.n;
            const result = [];
            for (const m in data.content) {
              const item = {
                name: m.split("_").join(" ").split("-").join(" "),
                data: data.content[m],
              };
              result.push(item);
            }
            console.log("result : ", result);
            // setApiData(result);
          }
        });
    } catch (err) {
      console.log(err);
    }
    console.log("use effect invoked End");
    setIsLoading(false);
  }, []);

  const handlePressGet = async () => {
    await storage.getString("name");
  };
  const handlePressSave = async () => {
    await storage.set("name", "new name 101");
  };
  const handlePressCreateData = async () => {
    createData([]);
  };

  let renderUI = (
    <View style={styles.container}>
      <Text className="text-rose-400">Custom text</Text>
      <TouchableOpacity onPress={fetchData}>
        <Text>fetch Data</Text>
      </TouchableOpacity>
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
  let loadingUI = (
    <View>
      <Text>Loading...</Text>
    </View>
  );
  return isLoading ? loadingUI : renderUI;
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
