import { View, Text } from 'react-native'
import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import {styleVariables} from "../utilities/GlobalConstants"
import Colors from '../utilities/Colors';

export default function Home() {
    return (
        <ScrollView style = {styles.viewContainer}>
            <View style={{height: 2000}}>
                <Text style={{fontFamily: 'Poppins-Regular'}}>Home</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: Colors.BACKGROUND, 
        paddingHorizontal: styleVariables.paddingHorizontal,
        gap: 20
    }
})
