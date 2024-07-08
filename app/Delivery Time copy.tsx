/*
|-----------------------------------------
| setting up DeliveryTime for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Text, TouchableOpacity, View } from 'react-native'

import screenData from '@/assets/json/setting.json'

import CommonUpdateUi from '@/components/route/setting/common-update-ui'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'
import { initDefaultRender } from '@/components/route/setting/setting/delivery'

const DeliveryTime = () => {
 const [render, setRender] = useState(initDefaultRender)
 const [dlvyTRenderData, setDlvyTRenderData] = useState<
  {
   dayName: string
   data: any
  }[]
 >([])
 const { dlvyT } = screenData

 useEffect(() => {
  const result = []
  for (let d in dlvyT) {
   const dayName = dayjs().day(parseInt(d)).format('dddd')
   const dlvyTime = dlvyT[d] || 'Closed'
   result.push({ dayName: dayName, data: dlvyTime })
  }
  setDlvyTRenderData([...result])
 }, [])
 const handleUpdate = (text: string) => {
  if (text === 'delivery time') {
   setRender({
    title: 'delivery time',
    renderData: dlvyTRenderData,
    // renderMileageData: [],
   })
  }
 }

 let renderUI = (
  <View className="px-2">
   <View>
    {/* Delivery Time */}
    <View className="mb-4 mt-2 flex flex-row items-center justify-between pr-2">
     <Text className="mt-2 pl-4 text-2xl font-semibold  text-slate-700">
      Day
     </Text>
     <TouchableOpacity onPress={() => handleUpdate('delivery time')}>
      <Feather name="edit" color="black" size={25} />
     </TouchableOpacity>
    </View>
    <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pl-4">
     {dlvyTRenderData.map((curr, idx) => (
      <View
       key={curr.dayName + idx}
       className="my-2 rounded-lg bg-white py-1 pl-2 "
      >
       <View className="flex w-full flex-row justify-between pl-1">
        <View className="flex flex-row gap-4">
         <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
          <Text className={`text-xl font-normal text-slate-800`}>
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
 if (render.title === 'delivery time') {
  renderUI = (
   <CommonUpdateUi
    renderUI="delivery time"
    setDlvyTRenderData={setDlvyTRenderData}
    setRender={setRender}
    data={render.renderData}
    setTimetableRenderData={undefined}
   />
  )
 }
 return <ScreenWrapper>{renderUI}</ScreenWrapper>
}
export default DeliveryTime
