import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../utilities/Colors';
import { styles, styleVariables } from '../../utilities/GlobalConstants'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const VehicleCard = ({ data, navigation }) => {
    useEffect(() => {
        console.log('Data: ' + JSON.stringify(data))
    }, [])
    return (
        <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigation.push('VehicleDetail', {vehicleData: data.item})}
            style={{borderTopLeftRadius: 12, 
            borderTopRightRadius: 12, 
            borderBottomLeftRadius: 10, 
            borderBottomRightRadius: 10, 
            borderColor: Colors.PRIMARY, 
            borderWidth: StyleSheet.hairlineWidth 
            }}>
            <View>
            <View style={{backgroundColor: Colors.PRIMARY, padding: 20, borderRadius: 10}}>
                <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between',}}>
                    <Text style={[styles.textLabel, {color: Colors.TEXT_SECONDARY}]}>{data.item.type?.toUpperCase()}</Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        {data.item?.potentialOdometerFraud == 1 && <MaterialCommunityIcons style={{transform: [{translateY: -2}]}} name="speedometer" size={16} color={Colors.SECONDARY}/>}
                        {data.item?.inspectionProblems == 1 && <MaterialCommunityIcons style={{transform: [{translateY: -2}]}} name="car-wrench" size={16} color={Colors.SECONDARY}/>}
                    </View>
                </View>
                <Text style={[styles.textData, {color: Colors.TEXT_SECONDARY}]}>{data.item?.name}</Text>
            </View>
            <View style={{padding: 20, gap: 5}}>
                <Text style={[styles.textData, {color: Colors.TERTIARY}]}>{data.item?.vin?.toUpperCase()}</Text>
                <Text style={[styles.textData, {color: Colors.EXTRA_GRAY}]}>{data.item?.km} km</Text>
                <Text style={[styles.textData, {color: Colors.EXTRA_GRAY}]}>{data.item?.color?.toUpperCase()}</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={[{color: Colors.EXTRA_GRAY}, styles.textLabel, {lineHeight: 15, fontSize: 12}]}>{data.item?.vehicleComment}</Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

export default VehicleCard

const style = StyleSheet.create({})