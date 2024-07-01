import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
 name: React.ComponentProps<typeof FontAwesome>['name']
 color: string
}) {
 return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
 const colorScheme = useColorScheme()

 return (
  <Tabs
   screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    // Disable the static render of the header on web
    // to prevent a hydration error in React Navigation v6.
    headerShown: useClientOnlyValue(false, true),
   }}
  >
   <Tabs.Screen
    name="index"
    options={{
     title: 'Menu',
     tabBarIcon: ({ color, size }) => (
      <MaterialIcons name="restaurant-menu" color={color} size={size} />
     ),
    }}
   />
   <Tabs.Screen
    name="storage"
    options={{
     title: 'Storage Settings',
     tabBarIcon: ({ color, size }) => (
      <FontAwesome6 name="database" color={color} size={size} />
     ),
    }}
   />
   <Tabs.Screen
    name="setting"
    options={{
     title: 'Setting',
     tabBarIcon: ({ color, size }) => (
      <AntDesign name="setting" color={color} size={size} />
     ),
    }}
   />
  </Tabs>
 )
}
