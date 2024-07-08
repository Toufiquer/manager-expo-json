/*
|-----------------------------------------
| setting up ScreenWrapper for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager-Expo, July, 2024
|-----------------------------------------
*/
import { ReactElement } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

function ScreenWrapper({ children }: { children: ReactElement }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>{children}</ScrollView>
        </SafeAreaView>
    )
}
export default ScreenWrapper
