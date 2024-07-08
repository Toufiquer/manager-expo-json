/*
|-----------------------------------------
| setting up MileageCost for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager-Expo, July, 2024
|-----------------------------------------
*/

import {
 View,
 Text,
 Modal,
 TextInput,
 StyleSheet,
 TouchableOpacity,
} from 'react-native'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo'
import settingScreenData from '@/assets/json/setting.json'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Fonts } from '@/components/utils/Fonts/CustomFonts'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'

const BorderStyle =
 'w-full rounded border border-gray-400 px-3 py-2 leading-tight text-gray-800'

export const MileageSchema = z.object({
 data: z
  .object({
   mile: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: 'Mileage must be number',
   }),
   data: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: 'Please provide a number',
   }),
  })
  .array(),
})
type displayDataType = { mile: any; data: any }
const initDeleteUIData = { idx: 0, isOpenUI: false }

const MileageCost = () => {
 const [mileageRenderData, setMileageRenderData] = useState<displayDataType[]>(
  []
 )

 const { mileage } = settingScreenData

 useEffect(() => {
  const resultMile: displayDataType[] = []
  for (let d in mileage) {
   const mile = mileage[d] || 'Closed'
   resultMile.push({ mile: d, data: mile })
  }
  setMileageRenderData([...resultMile])
 }, [])

 const [isSubmitting, setIsSubmitting] = useState(false)
 const [isDelete, setIsDelete] = useState(initDeleteUIData)
 const [process, setProcess] = useState(false)
 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({
  mode: 'onBlur',
  resolver: zodResolver(MileageSchema),
  defaultValues: { data: [] },
 })
 useEffect(() => {
  mileageRenderData.forEach((curr, idx) => {
   update(idx, { ...curr, data: curr.data + '' })
  })
 }, [mileageRenderData])
 const { fields, append, remove, update } = useFieldArray({
  control,
  name: 'data',
 })

 const navigation = useNavigation()

 const convertArrayToObject = (array) => {
  const result = {}
  array.forEach((item) => {
   result[item.mile] = parseFloat(item.data) // Convert string to number
  })
  return result
 }

 const onSubmit = (submitData) => {
  setIsSubmitting(true)
  const result = {
   ...settingScreenData,
   mileage: convertArrayToObject(submitData.data),
  }
  console.log('result : ', result)
  handleCloseModal()
  setIsSubmitting(false)
 }
 const handleDeleteCancel = () => setIsDelete(initDeleteUIData)

 const handleDeleteConfirm = () => {
  setProcess(true)
  remove(isDelete.idx)
  handleDeleteCancel()
  setProcess(false)
 }

 const handleCloseModal = () => {
  navigation.goBack()
 }

 let renderUI = (
  <View className="p-4">
   <View className="flex w-full flex-row items-end justify-between">
    <Text
     style={styles.fontsMulishBlack}
     className="max-w-[80%] text-2xl font-extrabold text-slate-800"
    >
     Update mileage cost
    </Text>
    <View className="flex h-full items-start justify-start">
     <TouchableOpacity onPress={() => handleCloseModal()}>
      <Entypo name="cross" color="red" size={30} />
     </TouchableOpacity>
    </View>
   </View>

   <View className="min-h-[300px] gap-1">
    {fields.length > 0 && (
     <View className="flex w-full flex-row items-center gap-1">
      <View className="w-[35%]">
       <Text
        style={styles.fontsMulishBlack}
        className="text-sm font-extrabold  text-gray-900"
       >
        Milages
       </Text>
      </View>
      <View className="w-[45%]">
       <Text
        style={styles.fontsMulishBlack}
        className="text-sm font-extrabold  text-gray-900"
       >
        Cost
       </Text>
      </View>
     </View>
    )}
    {fields.map((curr, index) => (
     <View
      key={curr.data + index}
      className="flex w-full flex-row items-center gap-1"
     >
      <View className="w-[35%]">
       <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
         <TextInput
          placeholder="0"
          className={BorderStyle}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
         />
        )}
        name={`data.${index}.mile`}
       />
       {errors.data && errors.data[index]?.mile && (
        <Text className="text-rose-500">
         {errors.data[index]?.mile?.message}{' '}
        </Text>
       )}
      </View>
      <View className="w-[45%]">
       <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
         <TextInput
          placeholder="0.0"
          className={BorderStyle}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
         />
        )}
        name={`data.${index}.data`}
       />
       {errors.data && errors.data[index]?.data && (
        <Text className="text-rose-500">
         {errors.data && errors.data[index]?.data?.message}{' '}
        </Text>
       )}
      </View>
      <TouchableOpacity
       onPress={() => setIsDelete({ idx: index, isOpenUI: true })}
      >
       <Entypo name="trash" color="red" size={30} />
      </TouchableOpacity>
     </View>
    ))}
   </View>

   <TouchableOpacity onPress={() => append({ mile: '', data: '' })}>
    <View className="mt-8 flex w-full flex-row items-center justify-between">
     <Text
      style={styles.fontsMulishBlack}
      className=" pl-2 text-xl font-extrabold text-gray-800"
     >
      Add a new Field
     </Text>

     <Entypo name="plus" color="blue" size={25} />
    </View>
   </TouchableOpacity>
   <View className="h-[60px]" />
   <TouchableOpacity
    onPress={handleSubmit(onSubmit)}
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
 )
 if (isDelete.isOpenUI === true) {
  renderUI = (
   <View className="p-4">
    <View className="flex w-full flex-row items-end justify-between">
     <Text
      style={styles.fontsMulishBlack}
      className="max-w-[80%] text-2xl font-extrabold uppercase text-gray-900"
     >
      Delete
     </Text>
     <View className="flex h-full items-start justify-start">
      <TouchableOpacity onPress={() => handleDeleteCancel()}>
       <Entypo name="cross" color="red" size={30} />
      </TouchableOpacity>
     </View>
    </View>

    <View className="min-h-[60vh]">
     <View className="mt-8">
      <View className="flex flex-row items-center">
       <Text className="text-2xl text-slate-900">Mileage: </Text>
       <Text className="text-2xl text-slate-900">
        {fields[isDelete.idx].mile}
       </Text>
      </View>
      <View className="flex flex-row items-center">
       <Text className="text-2xl text-slate-900">Cost: </Text>
       <Text className="text-2xl text-slate-900">
        {' '}
        {`\u00A3`}
        {fields[isDelete.idx].data}
       </Text>
      </View>
     </View>

     <View className="absolute bottom-[100px] self-center ">
      <View className="mt-6 w-full bg-rose-50 p-6">
       <View className="flex flex-row items-center justify-between">
        <Text
         style={styles.fontsMulishBlack}
         className="text-2xl font-bold text-rose-500"
        >
         Note
        </Text>
       </View>
       <View className="flex flex-row items-center justify-between">
        <View>
         <Text style={styles.fontsMulishBlack} className="text-rose-500">
          After Delete, Your data will not be recoverable
         </Text>
        </View>
       </View>
      </View>
     </View>

     <View className="absolute bottom-[-200px] w-full items-center justify-end self-center pb-[200px]">
      <Text
       style={styles.fontsMulishBlack}
       className="text-center text-2xl text-rose-400"
      >
       Are You Confirm?
      </Text>
      <TouchableOpacity
       disabled={process}
       className="mt-2 w-full max-w-xs rounded-3xl bg-rose-500"
       onPress={handleDeleteConfirm}
      >
       <View className="flex flex-row items-center justify-center gap-1">
        <Text
         style={styles.fontsMulishBlack}
         className="p-2 text-center text-xl font-semibold text-white"
        >
         Delete
        </Text>
        <EvilIcons name="trash" color="#fff" size={30} />
       </View>
      </TouchableOpacity>
     </View>
    </View>
   </View>
  )
 }
 return (
  <Modal animationType="slide" onRequestClose={handleCloseModal}>
   <ScreenWrapper>{renderUI}</ScreenWrapper>
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
export default MileageCost
