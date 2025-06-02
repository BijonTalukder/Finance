import React from 'react'
import { StatusBar, View, ViewStyle } from 'react-native'
export type ScreenWrapperProps={
    style?:ViewStyle,
    children:React.ReactNode,
    bg?:string
}
const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
  return (
    <View style={[style]}>
        <StatusBar barStyle="light-content"/>
     {children}
    </View>
  )
}

export default ScreenWrapper