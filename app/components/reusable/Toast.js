import { View, Text } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message';

export const showToastMessage = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
}