/*
|-----------------------------------------
| setting up DeliveryTime for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import { Link, useNavigation } from 'expo-router'
import { Modal, Text } from 'react-native'
import { View } from 'react-native'

const DeliveryTime = () => {
 const navigation = useNavigation()

 const handleCloseModal = () => {
  navigation.goBack()
 }
 return (
  <Modal onRequestClose={handleCloseModal}>
   <View>
    <Link href="/setting">Setting</Link>
    <Text>Delivery Time</Text>
   </View>
  </Modal>
 )
}
export default DeliveryTime
