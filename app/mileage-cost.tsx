/*
|-----------------------------------------
| setting up MileageCost for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Text, TouchableOpacity, View } from 'react-native'

import screenData from '@/assets/json/setting.json'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'
import { initDefaultRender } from '@/components/route/setting/setting/delivery'

import MileageCostUpdate from '@/components/route/setting/mileage-cost-update'

const MileageCost = ({ navigation }) => {
 const [render, setRender] = useState(initDefaultRender)
 const [mileageRenderData, setMileageRenderData] = useState([])

 const { mileage } = screenData

 useEffect(() => {
  const resultMile = []
  for (let d in mileage) {
   const mile = mileage[d] || 'Closed'
   resultMile.push({ mile: d, data: mile })
  }
  setMileageRenderData([...resultMile])
 }, [])
 const handleUpdate = (text) => {
  if (text === 'mileage cost') {
   setRender({
    title: 'mileage cost',
    renderData: [],
    renderMileageData: mileageRenderData,
   })
  }
 }

 let renderUI = (
  <View className="px-2">
   {/* Mileage Cost */}
   <View className="mt-2 flex flex-row items-center justify-between pr-2">
   
    <Text className="pl-2 text-2xl font-semibold text-slate-700">
     Mileage 
    </Text>
    <TouchableOpacity onPress={() => handleUpdate('mileage cost')}>
     <Feather name="edit" color="black" size={25} />
    </TouchableOpacity>
   </View>
   <View className="flex w-full flex-col items-center justify-center gap-2 py-2 pb-8 pl-4">
    {mileageRenderData.map((curr, idx) => (
     <View key={curr.data + idx} className="rounded-lg bg-white py-2 pl-2">
      <View className="flex w-full flex-row justify-between pl-1">
       <View className="flex flex-row gap-4">
        <View className="flex w-full max-w-[340px] flex-row items-center justify-between">
         <Text className={`text-xl font-normal text-slate-800`}>
          By Mileage {curr.mile}
         </Text>
         <Text className={`text-xl font-semibold text-slate-800`}>
          {`\u00A3`}
          {curr.data}
         </Text>
        </View>
       </View>
      </View>
     </View>
    ))}
   </View>
  </View>
 )

 if (render.title === 'mileage cost') {
  renderUI = (
   <MileageCostUpdate
    setRender={setRender}
    setMileageRenderData={setMileageRenderData}
    data={render.renderMileageData}
   />
  )
 }
 return <ScreenWrapper>{renderUI}</ScreenWrapper>
}
export default MileageCost
