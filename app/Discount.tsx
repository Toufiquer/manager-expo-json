/*
|-----------------------------------------
| setting up Discount for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager, July, 2024
|-----------------------------------------
*/
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Text, TouchableOpacity, View } from 'react-native'

import screenData from '@/assets/json/setting.json'
import DiscountUpdate from '@/components/route/setting/discount-update'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'
import {
 initDefaultRender,
 renderDiscountType,
} from '@/components/route/setting/setting/delivery'

const Discount = () => {
 const [render, setRender] = useState(initDefaultRender)
 const [discountRenderData, setDiscountRenderData] = useState<
  renderDiscountType[]
 >([])

 const { dcount } = screenData

 useEffect(() => {
  const resultDiscount = []
  for (let d in dcount) {
   const dayName = dayjs().day(parseInt(d)).format('dddd')
   const value = dcount[d] || 'Closed'
   resultDiscount.push({ day: dayName, data: value })
  }
  setDiscountRenderData([...resultDiscount])
 }, [])

 const handleUpdate = (text: string) => {
  if (text === 'discount') {
   setRender({
    title: 'discount',
    renderData: [],
    renderDiscountData: discountRenderData,
   })
  }
 }

 let renderUI = (
  <View className="px-2">
   {/* Discount */}
   <View className="mt-2 flex flex-row items-center justify-between pr-2">
    <Text className="pl-2 text-2xl font-semibold text-slate-700">Day</Text>
    <TouchableOpacity onPress={() => handleUpdate('discount')}>
     <Feather name="edit" color="black" size={25} />
    </TouchableOpacity>
   </View>
   <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pl-4">
    {discountRenderData.map((curr, idx) => (
     <View key={curr.data + idx} className="rounded-lg bg-white py-2 pl-2">
      <View className="flex w-full flex-row justify-between pl-1">
       <View className="flex flex-row gap-4">
        <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
         <Text className={`text-xl font-normal text-slate-800`}>
          {curr.day}
         </Text>
         <Text className={`text-xl font-semibold text-slate-800`}>
          {curr.data * 100} {`\u0025`}
         </Text>
        </View>
       </View>
      </View>
     </View>
    ))}
   </View>
  </View>
 )

 if (render.title === 'discount') {
  renderUI = (
   <DiscountUpdate
    setRender={setRender}
    setDiscountRenderData={setDiscountRenderData}
    data={render.renderDiscountData}
   />
  )
 }
 return <ScreenWrapper>{renderUI}</ScreenWrapper>
}
export default Discount
