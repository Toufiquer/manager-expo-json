/*
|-----------------------------------------
| setting up DiscountUpdate for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager, July, 2024
|-----------------------------------------
*/
import { z } from 'zod'
import Entypo from 'react-native-vector-icons/Entypo'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'

import { initDefaultRender } from '@/components/route/setting/setting/delivery'
import { Fonts } from '@/components/utils/Fonts/CustomFonts'

const BorderStyle =
    'w-full rounded border border-gray-400 px-3 py-2 leading-tight text-gray-800'

export const DiscountSchema = z.object({
    data: z
        .object({
            dName: z.string().refine((value) => !isNaN(parseFloat(value)), {
                message: 'Discount must be number',
            }),
            data: z.string().refine((value) => !isNaN(parseFloat(value)), {
                message: 'Please provide a number',
            }),
        })
        .array(),
})

const DiscountUpdate = ({ data, setRender, setDiscountRenderData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(DiscountSchema),
        defaultValues: { data: [] },
    })
    useEffect(() => {
        data.forEach((curr, idx) => {
            update(idx, { dName: curr.day, data: curr.data + '' })
        })
    }, [])
    const { fields, update } = useFieldArray({
        control,
        name: 'data',
    })
    const handleCancel = () => setRender(initDefaultRender)
    const onSubmit = (submitData) => {
        setIsSubmitting(true)
        setRender({ ...initDefaultRender, renderDiscountData: submitData.data })
        setDiscountRenderData(submitData.data)
        setIsSubmitting(false)
    }

    let renderUI = (
        <View className="p-4">
            <View className="flex w-full flex-row items-end justify-between">
                <Text
                    style={styles.fontsMulishBlack}
                    className="max-w-[80%] text-2xl font-semibold text-gray-800"
                >
                    Update Discount
                </Text>
                <View className="flex h-full items-start justify-start">
                    <TouchableOpacity onPress={() => handleCancel()}>
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
                                Day
                            </Text>
                        </View>
                        <View className="w-[45%]">
                            <Text
                                style={styles.fontsMulishBlack}
                                className="text-sm font-extrabold  text-gray-900"
                            >
                                Discount ({`\u0025`})
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
                            <Text
                                className={`text-xl font-semibold text-slate-800`}
                            >
                                {curr.dName}
                            </Text>
                        </View>
                        <View className="w-[45%]">
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => {
                                    const convertValue = value * 100
                                    return (
                                        <TextInput
                                            placeholder="0.0"
                                            className={BorderStyle}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={convertValue + ''}
                                        />
                                    )
                                }}
                                name={`data.${index}.data`}
                            />
                            {errors.data && errors.data[index]?.data && (
                                <Text className="text-rose-500">
                                    {errors.data &&
                                        errors.data[index]?.data?.message}{' '}
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>

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

    return renderUI
}
const styles = StyleSheet.create({
    fontsMulishBlack: {
        fontFamily: Fonts.MulishRegular,
    },
    fontsMulishRegular: {
        fontFamily: Fonts.MulishRegular,
    },
})
export default DiscountUpdate
