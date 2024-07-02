/*
|-----------------------------------------
| setting up Setting for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import { useState } from 'react'
import { Link } from 'expo-router'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Text, TouchableOpacity, View, Switch, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Fonts } from '@/components/utils/Fonts/CustomFonts'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'

export const settingData = [
 {
  path: 'Delivery Time',
  title: 'Delivery Time',
  icon: <MaterialIcons name="schedule" color="black" size={28} />,
 },
 {
  path: 'Mileage Cost',
  title: 'Mileage Cost',
  icon: <Fontisto name="motorcycle" color="black" size={28} />,
 },
 {
  path: 'Time Table',
  title: 'Time Table',
  icon: <MaterialCommunityIcons name="timetable" color="black" size={28} />,
 },
 {
  path: 'Discount',
  title: 'Discount',
  icon: <MaterialIcons name="discount" color="black" size={28} />,
 },
]

const SettingOverview = () => {
 const [isOffline, setIsOffline] = useState(false)
 const [dlvyStatus, setDlvyStatus] = useState(true)

 return (
  <ScreenWrapper>
   <View className=" px-4">
    {/* Change Status */}
    <View className=" border-sky-800 ">
     <View className="flex h-[50px] w-full flex-row items-center justify-between py-2">
      <View>
       <View className="flex flex-row">
        <Text
         style={styles.fontsMulishBlack}
         className="text-xl font-normal text-sky-800"
        >
         Current Status:
        </Text>
        {!isOffline ? (
         <View className="flex  flex-row items-center gap-2 pl-2">
          <Text
           style={styles.fontsMulishBlack}
           className="text-xl font-normal text-green-800"
          >
           Online
          </Text>
          <Fontisto name="radio-btn-active" color="green" size={15} />
         </View>
        ) : (
         <View className="flex  flex-row items-center gap-2 pl-2">
          <Text
           style={styles.fontsMulishBlack}
           className="text-xl font-normal text-rose-600"
          >
           Offline
          </Text>
          <Fontisto name="radio-btn-active" color="red" size={15} />
         </View>
        )}
       </View>
      </View>
      <TouchableOpacity onPress={() => ''}>
       <Switch
        onValueChange={(value) => setIsOffline(!value)}
        value={!isOffline}
       />
      </TouchableOpacity>
     </View>
     <View className="mb-2 flex h-[50px] w-full flex-row items-center justify-between py-2">
      <View>
       <View className="flex flex-row">
        <Text
         style={styles.fontsMulishBlack}
         className="text-xl font-normal text-sky-800"
        >
         Delivery Status:
        </Text>
        {dlvyStatus ? (
         <View className="flex flex-row items-center gap-2 pl-2">
          <Text
           style={styles.fontsMulishBlack}
           className="text-xl font-normal text-green-800"
          >
           ON
          </Text>
          <Fontisto name="radio-btn-active" color="green" size={15} />
         </View>
        ) : (
         <View className="flex  flex-row items-center gap-2 pl-2">
          <Text
           style={styles.fontsMulishBlack}
           className="text-xl font-normal text-rose-600"
          >
           OFF
          </Text>
          <Fontisto name="radio-btn-active" color="red" size={15} />
         </View>
        )}
       </View>
      </View>
      <TouchableOpacity onPress={() => ''}>
       <Switch
        onValueChange={(value) => setDlvyStatus(value)}
        value={dlvyStatus}
       />
      </TouchableOpacity>
     </View>
    </View>

    {/* Other Link */}
    <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pt-4">
     {settingData.map((curr, idx) => (
      <Link href={curr.path} key={curr.title + idx} className="w-full">
       <View
        className={`py-2 w-full flex min-w-[90vw] pr-8 border-slate-300 ${idx !== settingData.length - 1 ? 'border-b' : ''}`}
       >
        <View className="flex w-full flex-row justify-between pb-2 pl-1">
         <View className="flex flex-row gap-4">
          <View className="flex w-full flex-row items-center justify-between">
           <View className="flex flex-row items-center">
            {curr.icon}
            <Text className={`pl-2 text-[18px]  font-normal text-slate-700`}>
             {curr.title}
            </Text>
           </View>
           <MaterialIcons name="keyboard-arrow-right" color="black" size={28} />
          </View>
         </View>
        </View>
       </View>
      </Link>
     ))}
    </View>
   </View>
  </ScreenWrapper>
 )
}

const styles = StyleSheet.create({
 fontsMulishBlack: {
  fontFamily: Fonts.MulishRegular,
 },
 fontsMulishRegular: {
  fontFamily: Fonts.MulishRegular,
 },
})
export default SettingOverview
