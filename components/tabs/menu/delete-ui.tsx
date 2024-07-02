/*
|-----------------------------------------
| setting up Delete Menu for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: MyApp, January, 2024
|-----------------------------------------
*/
import { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts } from '@/components/utils/Fonts/CustomFonts'

import menu from '@/assets/json/menu.json'

function DeleteUI({ handleCancel, currentUIData }) {
    const [process, setProcess] = useState(false)

    const handleDeleteConfirm = () => {
        setProcess(true)
        let result: any = {}
        if (currentUIData.item) {
            for (let m in menu) {
                const checked =
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
                if (checked) {
                    result[m] = {
                        srl: menu[m]?.srl,
                        available: menu[m]?.available,
                        lst: menu[m]?.lst?.filter(
                            (curr) => curr.item !== currentUIData.item
                        ),
                    }
                    if (menu[m]?.i) {
                        result[m].i = menu[m].i
                    }
                } else {
                    result[m] = menu[m]
                }
            }
        } else {
            for (let m in menu) {
                if (
                    m
                        .split('-')
                        .join(' ')
                        .split('_')
                        .join(' ')
                        .toLocaleLowerCase() !==
                    currentUIData.title
                        .split('-')
                        .join(' ')
                        .split('_')
                        .join(' ')
                        .toLocaleLowerCase()
                ) {
                    result[m] = {
                        srl: menu[m]?.srl,
                        available: menu[m]?.available,
                        lst: menu[m]?.lst,
                    }
                    if (menu[m]?.i) {
                        result[m].i = menu[m].i
                    }
                }
            }
        }
        setProcess(false)
        handleCancel()
    }
    return (
        <View>
            <View className="fixed left-0 top-0 z-50 min-h-[680px] w-full  p-2">
                <View className="relative h-full w-full">
                    <View className="flex w-full">
                        <View className="flex w-full flex-row items-end justify-between">
                            <Text
                                style={styles.fontsMulishBlack}
                                className="max-w-[80%] text-2xl font-extrabold text-gray-900"
                            >
                                {currentUIData.item?.split('_').join(' ') ||
                                    currentUIData.title?.split('_').join(' ')}
                            </Text>
                            <View className="flex h-full items-start justify-start">
                                <TouchableOpacity
                                    onPress={() => handleCancel()}
                                >
                                    <Entypo
                                        name="cross"
                                        color="red"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full"></View>
                    </View>

                    <View className="absolute bottom-[250px] self-center ">
                        <View className="mt-6 w-full  p-6">
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
                                    <Text
                                        style={styles.fontsMulishBlack}
                                        className="text-rose-500"
                                    >
                                        After Delete, Your data will not be
                                        recoverable
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="absolute bottom-[-100px] w-full items-center justify-end self-center pb-[200px]">
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
                                <EvilIcons
                                    name="trash"
                                    color="#fff"
                                    size={30}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    fontsMulishBlack: {
        fontFamily: Fonts.MulishBlack,
    },
})
export default DeleteUI
