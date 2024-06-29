/*
|-----------------------------------------
| setting up First Load UI for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: MyApp, January, 2024
|-----------------------------------------
*/
import { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { storage } from '@/components/store/store'
import { Fonts } from '@/components/utils/Fonts/CustomFonts'
import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'

const initOptionData = {
    title: '',
    data: [],
}
function FirstLoadUI({ setShowUI, handleCancel, setCurrentUIData }) {
    const [arrOfMenu, setArrOfMenu] = useState([])
    const [uiOptions, setUiOptions] = useState(initOptionData)
    const [currTitle, setCurrTitle] = useState('')
    const [subItems, setSubItems] = useState([])
    ;(async () => {
        const menu = await storage.getString('user.menu')
        if (menu) {
            const parseMenu = JSON.parse(menu)
            for (const m in parseMenu) {
                const item = {
                    name: m.split('_').join(' ').split('-').join(' '),
                    data: parseMenu[m],
                }
                arrOfMenu.push(item)
            }
        }
    })()
    const handleSubItems = ({ data, title }) => {
        setCurrTitle(title)
        setSubItems([...data])
    }
    console.log('arr of menu', arrOfMenu)
    let renderer = (
        <View>
            <View className="flex w-full flex-col items-center justify-center gap-4 py-2 pb-8 pl-4">
                {arrOfMenu.length > 0 &&
                    arrOfMenu.map((curr, idx) => (
                        <View
                            key={curr.name + idx}
                            className="rounded-lg bg-white py-2 pl-2 shadow-lg shadow-indigo-500/50"
                        >
                            <View className="flex w-full flex-row justify-between pl-1">
                                <View className="flex flex-row gap-4">
                                    <View>
                                        <Text
                                            className={`text-xl font-bold uppercase text-slate-900`}
                                        >
                                            {curr.name.length > 16
                                                ? curr.name.slice(0, 14) + '...'
                                                : curr.name}
                                        </Text>
                                        {curr?.data?.lst?.length > 0 ? (
                                            <Text
                                                style={styles.fontsMulishBlack}
                                                className="font-bold"
                                            >
                                                {curr.data.lst.length} item
                                                {curr.data.lst.length > 1 &&
                                                    's'}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.fontsMulishBlack}
                                                className="font-bold"
                                            >
                                                No item
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View className="flex flex-row items-center justify-between gap-4 pr-2">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowUI('addMenu')
                                            setCurrentUIData({
                                                title: curr.name,
                                                item: '',
                                            })
                                        }}
                                    >
                                        <Feather
                                            name="plus"
                                            color="gray"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                    {curr?.name === currTitle &&
                                    subItems.length > 0 ? (
                                        <TouchableOpacity
                                            onPress={() => setSubItems([])}
                                        >
                                            <Entypo
                                                name="chevron-small-up"
                                                color="black"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        curr?.data?.lst?.length > 0 && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleSubItems({
                                                        title: curr.name,
                                                        data: curr?.data?.lst,
                                                    })
                                                }
                                            >
                                                <Entypo
                                                    name="chevron-small-down"
                                                    color="black"
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        )
                                    )}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowUI('deleteMenu')
                                            setCurrentUIData({
                                                title: curr.name,
                                                item: '',
                                            })
                                        }}
                                    >
                                        <EvilIcons
                                            name="trash"
                                            color="#ea580c"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {curr.data.i && (
                                <Text
                                    style={styles.fontsMulishBlack}
                                    className="pl-1 font-bold"
                                >
                                    {curr.data.i}
                                </Text>
                            )}
                            {/* Accordion toggle */}
                            {curr?.name === currTitle &&
                                subItems.length > 0 && (
                                    <View>
                                        {subItems.map((item, idx) => (
                                            <View key={item.id || '' + idx}>
                                                <View className="mt-3 rounded-lg border-t border-gray-400 px-2 py-2">
                                                    <View className="flex w-full flex-row justify-between ">
                                                        <View className="flex flex-row gap-4">
                                                            <View>
                                                                <View className="flex w-[240px] flex-row items-center justify-between">
                                                                    <Text
                                                                        style={
                                                                            styles.fontsMulishBlack
                                                                        }
                                                                        className="h-[30px] text-xl font-bold text-gray-800"
                                                                    >
                                                                        {item
                                                                            .item
                                                                            .length >
                                                                        15
                                                                            ? item.item.slice(
                                                                                  0,
                                                                                  17
                                                                              ) +
                                                                              '...'
                                                                            : item.item}
                                                                    </Text>
                                                                    <Text
                                                                        style={
                                                                            styles.fontsMulishBlack
                                                                        }
                                                                        className="text-xl font-bold text-gray-800"
                                                                    >
                                                                        {item.price &&
                                                                            ` \u00A3`}
                                                                        {item.price ||
                                                                            ''}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View className="flex flex-row items-center justify-between gap-4 pr-2">
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowUI(
                                                                        'updateMenu'
                                                                    )
                                                                    setCurrentUIData(
                                                                        {
                                                                            item: item.item,
                                                                            title: curr.name,
                                                                        }
                                                                    )
                                                                }}
                                                            >
                                                                <Feather
                                                                    name="edit"
                                                                    color="gray"
                                                                    size={20}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowUI(
                                                                        'deleteMenu'
                                                                    )
                                                                    setCurrentUIData(
                                                                        {
                                                                            item: item.item,
                                                                            title: curr.name,
                                                                        }
                                                                    )
                                                                }}
                                                            >
                                                                <EvilIcons
                                                                    name="trash"
                                                                    color="#f66"
                                                                    size={30}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    {item.info && (
                                                        <Text
                                                            style={
                                                                styles.fontsMulishMedium
                                                            }
                                                            className="font-thin text-slate-700 "
                                                        >
                                                            {item.info}
                                                        </Text>
                                                    )}
                                                </View>
                                                <View>
                                                    {item.item ===
                                                        uiOptions.title && (
                                                        <View className="flex flex-row flex-wrap gap-2">
                                                            {uiOptions.data.map(
                                                                (item) => (
                                                                    <View className="rounded-lg border border-gray-400  p-2 ">
                                                                        {(item.name ||
                                                                            item.optionFor) && (
                                                                            <Text className="uppercase text-gray-900">
                                                                                {
                                                                                    item.name
                                                                                }{' '}
                                                                                {item.optionFor && (
                                                                                    <Text className="lowercase">
                                                                                        (
                                                                                        {
                                                                                            item.optionFor
                                                                                        }

                                                                                        )
                                                                                    </Text>
                                                                                )}
                                                                            </Text>
                                                                        )}
                                                                        <Text className="text-xs text-gray-700">
                                                                            {item.required
                                                                                ? 'Required'
                                                                                : 'Not Required'}
                                                                        </Text>
                                                                        {item.options?.map(
                                                                            (
                                                                                i,
                                                                                idx
                                                                            ) => (
                                                                                <Text className="text-gray-700">
                                                                                    {idx +
                                                                                        1}

                                                                                    .{' '}
                                                                                    {
                                                                                        i.name
                                                                                    }{' '}
                                                                                    {i.price &&
                                                                                        `(${i.price})`}
                                                                                </Text>
                                                                            )
                                                                        )}
                                                                    </View>
                                                                )
                                                            )}
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                )}
                        </View>
                    ))}
            </View>
        </View>
    )
    return <ScreenWrapper>{renderer}</ScreenWrapper>
}
const styles = StyleSheet.create({
    fontsMulishBlack: {
        fontFamily: Fonts.MulishBlack,
    },
    fontsMulishMedium: {
        fontFamily: Fonts.MulishMedium,
    },
})
export default FirstLoadUI
