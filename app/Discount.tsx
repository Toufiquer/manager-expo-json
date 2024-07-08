/*
|-----------------------------------------
| setting up Discount for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

import { Link } from 'expo-router'
import { Modal, Text } from 'react-native'
import { View } from 'react-native'

const Discount = () => {
 return (
  <Modal>
   <View>
    <Link href="/setting">Setting</Link>
    <Text>Discount</Text>
   </View>
  </Modal>
 )
}
export default Discount
