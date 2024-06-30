/*
|-----------------------------------------
| setting up Common Menu Form for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager, June, 2024
|-----------------------------------------
*/
import { z } from 'zod'
import { useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import {
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'

import { menuItemType, storeType } from './../menu'

import menu from '@/assets/json/menu.json'
import { Fonts } from '@/components/utils/Fonts/CustomFonts'

export const newItemSchema = z.object({
    item: z
        .string({
            invalid_type_error: 'Item must be a string',
            required_error: 'Item is required',
        })
        .min(3, 'Minimum 3 characters')
        .max(320, 'Maximum 20 characters')
        .trim(),

    price: z
        .string()
        .refine((value) => !isNaN(parseFloat(value)), {
            message: 'Please provide a number',
        })
        .optional(),

    info: z
        .string({
            invalid_type_error: 'Info must be a string',
        })
        .min(3, 'Minimum 3 characters')
        .max(120, 'Maximum 120 characters')
        .trim()
        .optional(),

    option: z
        .object({
            name: z
                .string({
                    invalid_type_error: 'Name must be a string',
                    required_error: 'Name is required',
                })
                .min(3, 'Minimum 3 characters')
                .max(320, 'Maximum 20 characters')
                .trim(),

            optionFor: z
                .string({
                    invalid_type_error: 'OptionFor must be a string',
                })
                .min(3, 'Minimum 3 characters')
                .max(60, 'Maximum 60 characters')
                .trim()
                .optional(),

            required: z.boolean().optional(),

            options: z
                .object({
                    name: z
                        .string({
                            invalid_type_error: 'Name must be a string',
                        })
                        .min(3, 'Minimum 3 characters')
                        .max(320, 'Maximum 20 characters')
                        .trim(),
                    price: z
                        .string()
                        .refine((value) => !isNaN(parseFloat(value)), {
                            message: 'Please provide a number',
                        })
                        .optional(),
                })
                .array()
                .optional(),
        })
        .array()
        .optional(),
})
export type newItemFormSchema = z.infer<typeof newItemSchema>

const BorderStyle =
    'w-full rounded border border-gray-400 px-3 py-2 leading-tight text-gray-800'

const initMenuItem: menuItemType = { item: ' ' }
function CommonMenuForm({
    handleCancel,
    currentUIData,
}: {
    currentUIData: { title: string; item: string }
    handleCancel: () => void
}) {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<newItemFormSchema>({
        resolver: zodResolver(newItemSchema),
        defaultValues: initMenuItem,
    })
    const isUpdate = currentUIData.item !== ''
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'option',
    })
    useEffect(() => {
        reset()
        if (isUpdate) {
            const { title, item } = currentUIData || {}

            for (let m in menu) {
                if (
                    m
                        .split('-')
                        .join(' ')
                        .split('_')
                        .join(' ')
                        .toLocaleLowerCase() ===
                    title
                        .split('-')
                        .join(' ')
                        .split('_')
                        .join(' ')
                        .toLocaleLowerCase()
                ) {
                    const lst = menu[m].lst
                    const getItem = lst.find((i) => i.item === item)
                    setValue('item', getItem?.item || '')
                    setValue('price', getItem?.price || '')
                    setValue('info', getItem?.info || '')
                    getItem?.option &&
                        getItem.option.map((i, idx) => update(idx, i))
                }
            }
        }
    }, [])

    const cleanMenuData = (menuData) => {
        const simplifiedMenuData: any = {}

        for (const menuCategory in menuData) {
            simplifiedMenuData[menuCategory] = {
                srl: menuData[menuCategory].srl,
                available: menuData[menuCategory].available,
                lst: menuData[menuCategory].lst.map((item) => {
                    const simplifiedItem = {
                        item: item.item,
                        id: item.id,
                        price: item.price,
                        info: item.info,
                    }

                    // Clean option fields
                    if (item.option) {
                        const newOption = []
                        for (let option of item.option) {
                            if (
                                option.name === undefined ||
                                option.name === ''
                            ) {
                                delete option.name
                            }
                            if (
                                option.optionFor === undefined ||
                                option.optionFor === ''
                            ) {
                                delete option.optionFor
                            }
                            if (
                                option.required === undefined ||
                                option.required === '' ||
                                !option.required
                            ) {
                                delete option.required
                            } else {
                                // If no name, delete the whole option
                                if (
                                    option.name === undefined ||
                                    option.name === ''
                                ) {
                                    item.option.splice(
                                        item.option.indexOf(option),
                                        1
                                    )
                                }
                            }

                            if (option.options) {
                                for (let opt of option.options) {
                                    if (
                                        opt.name === undefined ||
                                        opt.name === ''
                                    ) {
                                        delete opt.name
                                    }
                                    if (
                                        opt.price === undefined ||
                                        opt.price === ''
                                    ) {
                                        delete opt.price
                                    }
                                }
                            }

                            // if options have an empty {} then filter them
                            if (option.options?.length >= 1) {
                                option.options = option.options.filter(
                                    (curr) => curr.name || curr.price
                                )
                            }

                            // if options inside option is not specified data then delete options
                            if (option.options?.length === 0) {
                                delete option.options
                            }
                            newOption.push(option)
                        }
                        if (newOption.length > 0) {
                            simplifiedItem.option = newOption
                        }
                    }
                    return simplifiedItem
                }),
            }
        }

        return simplifiedMenuData
    }

    const OptionComponents = ({ control, index, field }) => {
        const {
            fields: optionsFields,
            append: optionsAppend,
            remove: optionsRemove,
        } = useFieldArray({
            control,
            name: `option[${index}].options`,
        })
        return (
            <View
                key={field.name + index}
                className="relative mb-4 rounded-lg bg-white p-4"
            >
                <View className="absolute right-[6px] top-[6px] items-end justify-start">
                    <TouchableOpacity onPress={() => remove(index)}>
                        <Entypo name="cross" color="red" size={25} />
                    </TouchableOpacity>
                </View>
                <View className="w-full">
                    <Text
                        style={styles.fontsMulishBlack}
                        className="mb-1 mt-2 text-sm text-gray-700"
                    >
                        Option Name
                    </Text>
                    <Controller
                        control={control}
                        name={`option.${index}.name`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    placeholder="Option name"
                                    className={BorderStyle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    {errors.option && errors.option[index]?.name && (
                        <Text className="text-rose-500">
                            {errors.option[index]?.name?.message}{' '}
                        </Text>
                    )}
                    <Text
                        style={styles.fontsMulishBlack}
                        className="mb-1 mt-2 text-sm text-gray-700"
                    >
                        Option For
                    </Text>
                    <Controller
                        control={control}
                        name={`option.${index}.optionFor`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    placeholder="Option For"
                                    className={BorderStyle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    {errors.option && errors.option[index]?.optionFor && (
                        <Text className="text-rose-500">
                            {errors.option[index]?.optionFor?.message}{' '}
                        </Text>
                    )}
                </View>

                <View className="my-4 flex flex-row items-center justify-between">
                    <Text className="text-gray-900">Required</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Switch
                                onValueChange={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        name={`option.${index}.required`}
                        defaultValue={false}
                    />
                </View>

                <View className="flex w-full flex-row items-center justify-between">
                    <Text className="font-extrabold text-gray-900">
                        Options
                    </Text>
                    <TouchableOpacity
                        onPress={() => optionsAppend({ name: '' })}
                        className="flex h-[30px] items-center justify-center "
                    >
                        <Entypo name="plus" color="blue" size={25} />
                    </TouchableOpacity>
                </View>
                <View className="mt-3">
                    {optionsFields.map((field, innerIdx) => (
                        <View key={field.id}>
                            <OptionsComponents
                                key={field.id}
                                {...{
                                    control,
                                    innerIdx,
                                    field,
                                    optionsRemove,
                                    parentIdx: index,
                                }}
                            />
                        </View>
                    ))}
                </View>
            </View>
        )
    }
    const OptionsComponents = ({
        control,
        innerIdx,
        field,
        optionsRemove,
        parentIdx,
    }) => {
        return (
            <View
                key={field.name + innerIdx}
                className="mb-2 flex w-full flex-row justify-between"
            >
                <View className="w-[60%]">
                    <Controller
                        control={control}
                        name={`option[${parentIdx}].options.${innerIdx}.name`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    placeholder="Option name"
                                    className={BorderStyle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />

                                {errors.option &&
                                    errors.option[parentIdx]?.options?.[
                                        innerIdx
                                    ]?.name && (
                                        <Text className="text-rose-500">
                                            {
                                                errors.option[parentIdx]
                                                    ?.options?.[innerIdx]?.name
                                                    ?.message
                                            }{' '}
                                        </Text>
                                    )}
                            </View>
                        )}
                    />
                </View>

                <View className="w-[30%]">
                    <Controller
                        control={control}
                        name={`option[${parentIdx}].options.${innerIdx}.price`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <TextInput
                                    placeholder="0.0"
                                    className={BorderStyle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    {errors.option &&
                        errors.option[parentIdx]?.options?.[innerIdx]
                            ?.price && (
                            <Text className="text-rose-500">
                                {
                                    errors.option[parentIdx]?.options?.[
                                        innerIdx
                                    ]?.price?.message
                                }{' '}
                            </Text>
                        )}
                </View>
                <TouchableOpacity
                    onPress={() => optionsRemove(innerIdx)}
                    className="flex h-[40px] items-center justify-center "
                >
                    <Entypo name="cross" color="red" size={25} />
                </TouchableOpacity>
            </View>
        )
    }
    const onSubmit = (data: newItemFormSchema) => {
        try {
            let result = {} as storeType
            if (isUpdate) {
                // update
                const { title, item } = currentUIData || {}
                for (let m in menu) {
                    const itemMenu = { ...menu[m] }
                    if (
                        m
                            .split('-')
                            .join(' ')
                            .split('_')
                            .join(' ')
                            .toLocaleLowerCase() ===
                        title
                            .split('-')
                            .join(' ')
                            .split('_')
                            .join(' ')
                            .toLocaleLowerCase()
                    ) {
                        itemMenu.lst = itemMenu.lst?.map((i) => {
                            let a = { ...i }
                            if (i.item === item) {
                                a = { ...data }
                            }
                            return a
                        })
                    }
                    result[m] = itemMenu
                }
            } else {
                // add
                for (let m in menu) {
                    if (
                        m
                            .split('-')
                            .join(' ')
                            .split('_')
                            .join(' ')
                            .toLocaleLowerCase() ===
                        currentUIData.title
                            .split('-')
                            .join(' ')
                            .split('_')
                            .join(' ')
                            .toLocaleLowerCase()
                    ) {
                        result[m] = {
                            srl: menu[m]?.srl || 0,
                            available: menu[m]?.available || [],
                            lst: [data],
                        }
                        if (menu[m]?.lst?.length > 0) {
                            result[m].lst = [...menu[m]?.lst, data] || []
                        }
                        if (menu[m]?.i) {
                            result[m].i = menu[m].i
                        }
                    } else {
                        result[m] = menu[m]
                    }
                }
            }
            /**
             * if user add option and did not write optionFor then it return "", and the default value for required is false. So it must be delete the filed
             *
             * this function is deleted the fields
             * 1. option -> check if required is false then delete the field
             * 2. option -> check if name is "" or undefined then delete the field
             * 2. option -> check if optionFor is "" or undefined then delete the field
             * 2. option.options -> check if name is "" or undefined then delete the field
             * 2. option.options -> check if price is "" or undefined then delete the field
             * */

            const cleanedMenuData = cleanMenuData(result)
            console.log('submitted data : ', JSON.stringify(cleanedMenuData))
            reset()
            handleCancel()
        } catch (e) {
            setError('root', { message: 'Please try again' })
        }
    }
    return (
        <View className="fixed left-0 top-0 min-h-[88vh] w-full ">
            <View className="p-4">
                <View className="flex w-full flex-row items-end justify-between pb-6">
                    <Text
                        style={styles.fontsMulishBlack}
                        className="max-w-[80%] text-2xl font-extrabold text-gray-900"
                    >
                        {isUpdate ? 'Update' : 'Add a new one'}
                    </Text>
                    <View className="flex items-start justify-start">
                        <TouchableOpacity onPress={() => handleCancel()}>
                            <Entypo name="cross" color="red" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex w-full ">
                    <View>
                        <View>
                            <Text
                                style={styles.fontsMulishBlack}
                                className="mb-1 text-sm text-gray-700"
                            >
                                Item Name
                            </Text>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        placeholder="First name"
                                        className={BorderStyle}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="item"
                            />
                            {errors.item && (
                                <Text className="text-rose-500">
                                    {errors.item.message}{' '}
                                </Text>
                            )}
                            <Text
                                style={styles.fontsMulishBlack}
                                className="mb-1 mt-2 text-sm text-gray-700"
                            >
                                Item Price
                            </Text>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        className={BorderStyle}
                                        placeholder="0"
                                        onBlur={onBlur}
                                        keyboardType="decimal-pad"
                                        onChangeText={(e) => onChange(e)}
                                        value={value}
                                    />
                                )}
                                name="price"
                            />
                            {errors.price && (
                                <Text className="text-rose-500">
                                    {errors.price.message}{' '}
                                </Text>
                            )}
                            <Text
                                style={styles.fontsMulishBlack}
                                className="mb-1 mt-2 text-sm text-gray-700"
                            >
                                Item Info
                            </Text>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        placeholder="Item Info"
                                        className={BorderStyle}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        numberOfLines={8}
                                        textAlignVertical="top"
                                        value={value}
                                    />
                                )}
                                name="info"
                            />
                            {errors.info && (
                                <Text className="text-rose-500">
                                    {errors.info.message}{' '}
                                </Text>
                            )}
                        </View>
                        <View className="my-4 flex w-full flex-row items-center justify-between ">
                            <Text
                                style={styles.fontsMulishBlack}
                                className="text-sm text-gray-900"
                            >
                                Option
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    append({
                                        name: '',
                                        options: [],
                                    })
                                }
                            >
                                <View className="flex items-center justify-center">
                                    <Entypo
                                        name="plus"
                                        color="blue"
                                        size={25}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View className="h-[40px] w-full" />
            {fields.map((field, index) => (
                <View key={field.id}>
                    <OptionComponents
                        key={field.id}
                        {...{ control, index, field }}
                    />
                </View>
            ))}
            <View className="h-[100px] w-full" />
            <View className="absolute bottom-0 w-full px-4">
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className={`"mt-2 " w-full rounded-xl ${isSubmitting ? 'bg-blue-200' : 'bg-blue-500'}`}
                >
                    <Text
                        style={styles.fontsMulishBlack}
                        className="p-2 text-center text-xl font-semibold text-white"
                    >
                        {isSubmitting
                            ? 'Processing...'
                            : isUpdate
                              ? 'Update'
                              : 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    fontsMulishBlack: {
        fontFamily: Fonts.MulishBlack,
    },
})
export default CommonMenuForm
