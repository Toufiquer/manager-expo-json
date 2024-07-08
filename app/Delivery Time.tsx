/*
|-----------------------------------------
| setting up DeliveryTime for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import dayjs from 'dayjs'
import { Link, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Modal, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

import settingScreenData from '@/assets/json/setting.json'
import { Fonts } from '@/components/utils/Fonts/CustomFonts'
import DateTimePicker from '@react-native-community/datetimepicker'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'

type generateDataType = {
 value: {
  startTime: string
  endTime: string
  isClosed: boolean
 }
 dayName: string
}[]

const removeAmPm = (str: string) =>
 str &&
 str
  .split('pm')
  .join('')
  .split('PM')
  .join('')
  .split('am')
  .join('')
  .split('AM')
  .join('')

const newDate = new Date()

const initUpdateValue = {
 dayName: '',
 value: {
  endTime: '',
  startTime: '',
  isClosed: true,
 },
}

const DeliveryTime = () => {
 const [dlvyTRenderData, setDlvyTRenderData] = useState<
  {
   dayName: string
   data: any
  }[]
 >([])

 const [allData, setAllData] = useState<generateDataType>([])
 const [singleUpdateData, setSingleUpdateData] = useState({
  ...initUpdateValue,
  whichTime: '',
  idx: 0,
 })
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [date, setDate] = useState(newDate)

 useEffect(() => {
  const generateData = dlvyTRenderData.map((curr, idx) => {
   return {
    value: {
     startTime: curr.data.toLocaleLowerCase().includes('closed')
      ? ''
      : curr.data.split(' - ')[0],
     endTime: curr.data.split(' - ')[1] || '',
     isClosed: curr.data.toLocaleLowerCase().includes('closed'),
    },
    dayName: curr.dayName,
   }
  })
  setAllData(generateData)
 }, [dlvyTRenderData])

 const onSubmit = () => {
  setIsSubmitting(true)
  {
   const updateData = allData.map((curr, idx) => ({
    data: curr.value.isClosed
     ? 'Closed'
     : `${curr.value.startTime} - ${curr.value.endTime}`,
    dayName: curr.dayName,
   }))
   const result = { ...settingScreenData }
   // result.dlvyT = updateData
   console.log('result: ', result)
  }

  setIsSubmitting(false)
  handleCloseModal()
 }

 const onChange = (event, selectedDate) => {
  if (event.type === 'set') {
   if (event.type === 'set') {
    const currentDate = selectedDate || new Date()
    let tempDate = new Date(currentDate)
    let hours = tempDate.getHours()
    let minutes = tempDate.getMinutes()
    let formattedHours = hours < 10 ? '0' + hours : hours
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    let fTime = `${formattedHours}: ${formattedMinutes}`
    const generateData = allData.map((curr, index) => ({
     ...curr,
     value: {
      startTime:
       singleUpdateData.idx === index &&
       singleUpdateData.whichTime === 'start time'
        ? fTime
        : curr.value.startTime,
      endTime:
       singleUpdateData.idx === index &&
       singleUpdateData.whichTime === 'end time'
        ? fTime
        : curr.value.endTime,
      isClosed: singleUpdateData.idx === index ? false : curr.value.isClosed,
     },
    }))
    setAllData(generateData)
    setSingleUpdateData({
     ...initUpdateValue,
     whichTime: '',
     idx: 0,
    })
   }
  }
 }

 const handleDayValueChanged = (idx: number, value: any) => {
  const generateData = allData.map((curr, index) => ({
   ...curr,
   value: {
    ...curr.value,
    isClosed: index === idx ? value : curr.value.isClosed,
   },
  }))
  setAllData(generateData as generateDataType)
 }

 const handleSetUpdateData = (
  dayName: string,
  idx: number,
  whichTime: string
 ) => {
  let [hours, minutes] = ['0', '0']
  if (!hours.toLocaleLowerCase().includes('closed')) {
   hours = dlvyTRenderData[idx].data?.split('-')[0]?.split(':')[0]
   minutes = dlvyTRenderData[idx].data?.split('-')[0]?.split(':')[1] || '0'
  }
  minutes = removeAmPm(minutes || '0')
  hours = hours.toLocaleLowerCase().includes('closed') ? '0' : hours
  newDate.setHours(Number(hours), Number(minutes || '0'))
  setDate(newDate)
  setSingleUpdateData({
   dayName: dayName,
   value: { endTime: '--:--', isClosed: false, startTime: '--:--' },
   whichTime,
   idx,
  })
 }

 const { dlvyT } = settingScreenData

 useEffect(() => {
  const result = []
  for (let d in dlvyT) {
   const dayName = dayjs().day(parseInt(d)).format('dddd')
   const dlvyTime = dlvyT[d] || 'Closed'
   result.push({ dayName: dayName, data: dlvyTime })
  }
  setDlvyTRenderData([...result])
 }, [])
 const navigation = useNavigation()

 const handleCloseModal = () => {
  navigation.goBack()
 }
 return (
  <Modal onRequestClose={handleCloseModal}>
   <ScreenWrapper>
    <View className="fixed left-0 top-0 z-50 min-h-[680px] w-full bg-white p-2">
     <View className="relative h-full w-full">
      <View className="flex w-full">
       <View className="mb-4 flex w-full flex-row items-end justify-between">
        <Text
         style={styles.fontsMulishRegular}
         className="max-w-[80%] pl-3 text-2xl font-extrabold text-slate-800"
        >
         Update Delivery Time
        </Text>
        <View className="flex h-full items-start justify-start">
         <TouchableOpacity onPress={() => handleCloseModal()}>
          <Entypo name="cross" color="red" size={30} />
         </TouchableOpacity>
        </View>
       </View>
       {/* Every Day Time Update */}
       <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pl-4">
        {allData.map((curr, idx) => (
         <View
          key={curr.dayName + idx}
          className="mb-4 rounded-lg bg-white shadow-lg shadow-indigo-500/50"
         >
          <View className="mt-2 flex w-full flex-row items-center justify-between pr-2">
           <Text className="mt-2 pl-2 text-2xl font-semibold text-slate-600">
            {curr.dayName}
           </Text>
           <TouchableOpacity>
            <Switch
             onValueChange={(e) => handleDayValueChanged(idx, !e)}
             value={!curr.value.isClosed}
            />
           </TouchableOpacity>
          </View>
          {!curr.value.isClosed ? (
           <View>
            <View className="py-2 pl-2">
             <View className="flex w-full flex-row justify-between pl-1">
              <View className="flex flex-row gap-4">
               <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
                <Text className={`text-xl font-bold text-slate-600`}>
                 Start{' '}
                </Text>
                <View className="flex flex-row gap-4">
                 <Text className={`text-xl font-bold uppercase text-slate-900`}>
                  {curr.value.startTime || '--:--'}
                 </Text>
                 <TouchableOpacity
                  onPress={() =>
                   handleSetUpdateData(curr.dayName, idx, 'start time')
                  }
                 >
                  <Feather name="edit" color="gray" size={20} />
                 </TouchableOpacity>
                </View>
               </View>
              </View>
             </View>
            </View>
            <View className="mt-2 py-2 pl-2">
             <View className="flex w-full flex-row justify-between pl-1">
              <View className="flex flex-row gap-4">
               <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
                <Text className={`text-xl font-bold text-slate-600`}>End</Text>
                <View className="flex flex-row gap-4">
                 <Text className={`text-xl font-bold uppercase text-slate-900`}>
                  {curr.value.endTime || '--:--'}
                 </Text>
                 <TouchableOpacity
                  onPress={() =>
                   handleSetUpdateData(curr.dayName, idx, 'end time')
                  }
                 >
                  <Feather name="edit" color="gray" size={20} />
                 </TouchableOpacity>
                </View>
               </View>
              </View>
             </View>
            </View>
           </View>
          ) : (
           <View>
            <View className="py-2 pl-2">
             <View className="flex w-full flex-row justify-between pl-1">
              <View className="flex flex-row gap-4">
               <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
                <Text className={`text-xl font-bold uppercase text-rose-500`}>
                 Closed
                </Text>
               </View>
              </View>
             </View>
            </View>
           </View>
          )}
         </View>
        ))}
       </View>
       <View className="w-full">
        {singleUpdateData.dayName !== '' && (
         <DateTimePicker
          testId="dateTime"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
         />
        )}
        <TouchableOpacity
         onPress={onSubmit}
         disabled={isSubmitting}
         className={`"mt-2 " w-full rounded-xl ${isSubmitting ? 'bg-blue-200' : 'bg-blue-500'}`}
        >
         <Text
          style={styles.fontsMulishBlack}
          className="p-2 text-center text-xl font-semibold text-white"
         >
          {isSubmitting ? 'Processing...' : 'Update'}
         </Text>
        </TouchableOpacity>
        <View className="h-[60px]" />
       </View>
      </View>
     </View>
    </View>
   </ScreenWrapper>
  </Modal>
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
export default DeliveryTime
