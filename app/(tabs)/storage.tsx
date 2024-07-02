/*
|-----------------------------------------
| setting up Storage for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, June, 2024
|-----------------------------------------
*/
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import {
  createData,
  getValue,
  readData,
  setValue,
} from "@/components/store/store";
import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const getMenuAndSave = async () => {
      try {
        setIsLoading(true);
        const request = await fetch(process.env.EXPO_PUBLIC_API_URL as string);
        const response = await request.json();

        if (request.status === 200) {
          const { content } = response;
          delete content.a;
          delete content.n;
        } else {
          console.log(" something went wrong [fetch] plz try again");
        }
      } catch (error) {
        console.log("Something went wrong [fetch] plz try again", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMenuAndSave();
  };
  const handlePressGet = async () => {
    await getValue("name");
  };
  const handlePressSave = async () => {
    await setValue("name", "new name 101");
  };
  const handlePressCreateData = async () => {
    createData([]);
  };
  const handleGetFullStore = async () => {
    const data = await readData();
    console.log(" get all data : ", data);
    console.log(" get all data length: ", data.length);
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
