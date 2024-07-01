/*
|-----------------------------------------
| setting up TimeTable for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Text, TouchableOpacity, View } from 'react-native'

import screenData from '@/assets/json/setting.json'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'

import { initDefaultRender } from '@/components/route/setting/setting/delivery'

import CommonUpdateUi from '@/components/route/setting/common-update-ui'

const TimeTable = ({ navigation }) => {
 const [render, setRender] = useState(initDefaultRender)
 const [timetableRenderData, setTimetableRenderData] = useState([])

 const { timetable } = screenData

 useEffect(() => {
  const result = []
  for (let d in timetable) {
   const dayName = dayjs().day(parseInt(d)).format('dddd')
   const time = timetable[d]
   result.push({ dayName: dayName, data: time })
  }
  setTimetableRenderData([...result])
 }, [])

 const handleUpdate = (text) => {
  if (text === 'time table') {
   setRender({
    title: 'time table',
    renderData: timetableRenderData,
    renderMileageData: [],
   })
  }
 }

 let renderUI = (
  <View className="px-2">
   <View>
    {/* Time Table */}
    <View className="mt-2 flex flex-row items-center justify-between pr-2">
     <Text className="pl-4 text-2xl font-semibold  text-slate-700">Day</Text>
     <TouchableOpacity onPress={() => handleUpdate('time table')}>
      <Feather name="edit" color="black" size={25} />
     </TouchableOpacity>
    </View>
    <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pl-4">
     {timetableRenderData.map((curr, idx) => (
      <View key={curr.dayName + idx} className="rounded-lg bg-white py-2 pl-2">
       <View className="flex w-full flex-row justify-between pl-1">
        <View className="flex flex-row gap-4">
         <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
          <Text className={`text-xl font-normal text-slate-700`}>
           {curr.dayName}
          </Text>
          <Text
           className={`text-xl font-bold uppercase ${curr.data.toLocaleLowerCase() === 'closed' ? ' text-rose-600 ' : '  text-slate-900 '}`}
          >
           {curr.data}
          </Text>
         </View>
        </View>
       </View>
      </View>
     ))}
    </View>
   </View>
  </View>
 )
 if (render.title === 'time table') {
  renderUI = (
   <CommonUpdateUi
    renderUI="time table"
    setTimetableRenderData={setTimetableRenderData}
    setRender={setRender}
    data={render.renderData}
    setDlvyTRenderData={undefined}
   />
  )
 }
 return <ScreenWrapper>{renderUI}</ScreenWrapper>
}
export default TimeTable
