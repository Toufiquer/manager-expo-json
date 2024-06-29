/*
|-----------------------------------------
| setting up Create Menu for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: MyApp, January, 2024
|-----------------------------------------
*/
import { z } from "zod";
import Entypo from "react-native-vector-icons/Entypo";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";

import { storage } from "@/App";
import { Fonts } from "@/theme/assets/style";
import { storeType, storeValueType } from "@/types/schemas/menu";
import { BorderStyle } from "@/theme/assets/style/borderStyle";
import { getStoreData } from "@/components/utils/store-data";

function CreateMenu({ handleCancel }) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const getASrl = (menu) => {
    let srl = 1;
    for (let m in menu) {
      srl = menu[m].srl > srl ? menu[m].srl + 1 : srl;
    }
    return srl;
  };
  const onSubmit = (data) => {
    const menu = getStoreData();
    try {
      let result = {};
      const newMenu = () => ({
        available: [0, 1, 2, 3, 4, 5, 6],
        lst: [],
        srl: getASrl(menu),
      });

      if (data.info) {
        result = {
          ...menu,
          [data.title.split(" ").join("_")]: { ...newMenu(), i: data.info },
        };
      } else {
        result = {
          ...menu,
          [data.title.split(" ").join("_")]: { ...newMenu() },
        };
      }
      storage.set("user.menu", JSON.stringify(result));
      reset();
      handleCancel();
    } catch (e) {
      setError("root", { message: "Please Try again" });
    }
  };
  return (
    <View className="fixed left-0 top-0 z-50 min-h-[88vh] w-full ">
      <View className="flex p-6">
        <View className="flex flex-row items-end justify-between pb-6">
          <Text style={styles.fontsMulishBlack} className="max-w-[85%] text-3xl font-extrabold text-gray-950">
            Create Menu
          </Text>
          <View className="flex items-start justify-start">
            <TouchableOpacity onPress={() => handleCancel()}>
              <Entypo name="cross" color="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex">
          <View>
            <View>
              <Text style={styles.fontsMulishBlack} className="pb-1 text-sm">
                Name
              </Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Please Enter Name of Menu"
                    className={BorderStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="title"
              />
              {errors.title && <Text className="text-rose-500">{errors.title.message} </Text>}

              <Text style={styles.fontsMulishBlack} className="mt-4 pb-1 text-sm">
                Info
              </Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Menu Information"
                    className={BorderStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable
                    multiline
                    textAlignVertical="top"
                    numberOfLines={8}
                  />
                )}
                name="info"
              />
              {errors.info && <Text className="text-rose-500">{errors.info.message} </Text>}
            </View>
          </View>
        </View>
      </View>
      <View className="absolute bottom-[10px] w-full px-4">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="mt-2 w-full rounded-xl bg-blue-500"
        >
          <Text style={styles.fontsMulishBlack} className="p-2 text-center text-xl font-extrabold text-white">
            {isSubmitting ? "Processing..." : "Create"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="max-w-sm self-center rounded-lg  p-4">
        {errors.root && (
          <View className="flex flex-row gap-1">
            <Text className="font-extrabold text-rose-500">Error: </Text>
            <Text className="text-rose-500">{errors.root.message} </Text>
          </View>
        )}
      </View>
      <View className="h-[100px] w-full" />
    </View>
  );
}
const styles = StyleSheet.create({
  fontsMulishBlack: {
    fontFamily: Fonts.MulishBlack,
  },
});
export default CreateMenu;
