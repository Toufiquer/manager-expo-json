/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Manager-Expo, July, 2024
|-----------------------------------------
*/
import { View } from 'react-native'
import React, { useState } from 'react'

import ScreenWrapper from '@/components/utils/screenWrapper/screen-wrapper'
import CommonMenuForm from '@/components/tabs/menu/menu-form/common-menu-form'

import FirstLoadUI from '@/components/tabs/menu/first-ui'
import DeleteUI from '@/components/tabs/menu/delete-ui'

function Menu() {
 const [showUi, setShowUI] = useState('')
 const [currentUIData, setCurrentUIData] = useState({ title: '', item: '' })

 const handleCancel = () => {
  setShowUI('')
 }

 const renderContent = () => {
  switch (showUi) {
   case 'addMenu':
    return (
     <CommonMenuForm
      handleCancel={handleCancel}
      currentUIData={currentUIData}
     />
    )
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
     <FirstLoadUI setShowUI={setShowUI} setCurrentUIData={setCurrentUIData} />
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
