import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import Colors from '../../utilities/Colors'

const Button = ({onPress, label, disabled}) => {
  return (
    <TouchableHighlight
    disabled={disabled} 
    underlayColor={Colors.TERTIARY}
    onPress={onPress}
    style={{paddingHorizontal: 20, backgroundColor: !disabled ? Colors.PRIMARY : Colors.EXTRA_GRAY, borderRadius: 5, justifyContent: 'center', alignItems:'center', padding: 10}}>
        <Text style={{color: Colors.TEXT_SECONDARY, fontFamily: 'Poppins-Bold'}}>{label}</Text>
    </TouchableHighlight>
  )
}

export default Button