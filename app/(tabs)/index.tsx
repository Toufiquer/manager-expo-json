/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, June, 2024
|-----------------------------------------
*/
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'
import CommonMenuForm from '@/components/tabs/menu/menu-form/common-menu-form'

import FirstLoadUI from '@/components/tabs/menu/first-ui'
import CreateMenu from '@/components/tabs/menu/create-menu'
import DeleteUI from '@/components/tabs/menu/delete-ui'
import { Text } from 'react-native'

function Menu() {
 const [showUi, setShowUI] = useState('')
 const [currentUIData, setCurrentUIData] = useState({ title: '', item: '' })

 const handleCancel = () => {
  setShowUI('')
 }

 const renderContent = () => {
  switch (showUi) {
   case 'createMenu':
    return <CreateMenu handleCancel={handleCancel} />
   case 'addMenu':
   case 'updateMenu':
    return (
     <CommonMenuForm
      handleCancel={handleCancel}
      currentUIData={currentUIData}
     />
    )
   case 'deleteMenu':
    return (
     <DeleteUI handleCancel={handleCancel} currentUIData={currentUIData} />
    )
   default:
    return (
     <FirstLoadUI
      setShowUI={setShowUI}
      handleCancel={handleCancel}
      setCurrentUIData={setCurrentUIData}
     />
    )
  }
 }

 return (
  <ScreenWrapper>
   <View>{renderContent()}</View>
  </ScreenWrapper>
 )
}

export default Menu
