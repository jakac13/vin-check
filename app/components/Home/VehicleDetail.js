import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../utilities/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchMainComponent from '../Search/SearchMainComponent'

const VehicleDetail = ({ route }) => {
    const { vehicleData } = route.params;
    
    return (
        <View style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
            <SearchMainComponent vehicleData={vehicleData} displaySearchBar={false}/>
        </View>
    )
}

export default VehicleDetail

const style = StyleSheet.create({})