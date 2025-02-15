import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import VehicleCard from './VehicleCard'
import { signOut } from 'firebase/auth';
import Button from '../reusable/Button';
import { auth } from '../../../config/firebase';


const VehicleList = (props) => {

    const handleLogout = async () => {
        await signOut(auth);
    }


    return (
        <View style={{paddingBottom: 20}}>
            <FlatList 
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 20}}/>}
            data={props.vehicles}
            renderItem={(item) => <VehicleCard data={item} navigation={props.navigation}/>}
            keyExtractor={item => item.id}/>
        </View>
    )
}

export default VehicleList

const style = StyleSheet.create({})