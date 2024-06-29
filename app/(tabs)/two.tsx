import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { createData, readData, storage } from "@/components/store/store";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const getMenuAndSave = async () => {
      const request = await fetch(process.env.EXPO_PUBLIC_API_URL as string);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await request.json();

      if (request.status === 200) {
        const { content } = response;
        delete content.a;
        delete content.n;
        console.log("fetch content : ", JSON.stringify(content));
        // storage.set("user.menu", JSON.stringify(content));
      } else {
      }
    };
    getMenuAndSave();
  };
  const handlePressGet = async () => {
    await storage.getString("name");
  };
  const handlePressSave = async () => {
    await storage.set("name", "new name 101");
  };
  const handlePressCreateData = async () => {
    createData([]);
  };
  const handleGetFullStore = async () => {
    const data = await readData();
    console.log(" get all data : ", data);
  };

  const Button = ({ str }: { str: string }) => (
    <Text className="text-xl border px-4 my-2 rounded-lg">{str}</Text>
  );

  let renderUI = (
    <View className="flex-1 items-center justify-center">
      <Text className="text-rose-400 text-2xl mb-2">Tailwind css </Text>
      <TouchableOpacity onPress={fetchData}>
        <Button str="fetch Data" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressCreateData}>
        <Button str="clear full storage" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressGet}>
        <Button str="Get Data" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressSave}>
        <Button str="Save Data" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetFullStore}>
        <Button str="Get full Store" />
      </TouchableOpacity>
    </View>
  );
  let loadingUI = (
    <View>
      <Text>Loading...</Text>
    </View>
  );
  return isLoading ? loadingUI : renderUI;
}
