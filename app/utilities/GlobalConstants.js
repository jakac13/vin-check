
import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const styleVariables = {
    paddingHorizontal: 20,
    paddingVertical: 10,
}

export const fontSize = {
    headline: 33,
    title: 23,
    title2: 19,
    subtitle: 16,
    body: 16,
    body2: 14,
    button: 14,
}

export const styles = StyleSheet.create({
    textLabel: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontSize.body2,
      color: Colors.EXTRA_GRAY
    },
    textData: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize.body,
      color: Colors.PRIMARY
    },
    textTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize.title2,
      color: Colors.PRIMARY
    },
    dataContainer: {
        flexBasis: 120
    }
  })
