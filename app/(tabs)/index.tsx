/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, June, 2024
|-----------------------------------------
*/

import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import FirstUI from '@/components/tabs/menu/first-ui'

function Menu() {
    const [showUi, setShowUI] = useState('')

    const renderContent = () => {
        switch (showUi) {
            case 'createMenu':
                return <Text>create UI</Text>
            case 'addMenu':
                return <Text>add UI</Text>
            case 'updateMenu':
                return <Text>update UI</Text>
            case 'deleteMenu':
                return <Text>delete UI</Text>
            default:
                return <FirstUI />
        }
    }

    return renderContent()
}

export default Menu
