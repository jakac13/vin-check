import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import Button from '../reusable/Button';
import Colors from '../../utilities/Colors';
import {styleVariables, styles} from '../../utilities/GlobalConstants';
import { auth } from '../../../config/firebase';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import VehicleCard from './VehicleCard';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../../../config/firebase';
import { FETCH_STATUS } from '../../api/fetchStatus';
import VehicleList from './VehicleList';

const HomeMainComponent = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [fetchingStatus, setFetchingStatus] = useState(FETCH_STATUS.IDLE);

    const handleLogout = async () => {
        setLoading(true);
        await signOut(auth);
        setLoading(false);
    }

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        setFetchingStatus(FETCH_STATUS.LOADING);
        const favoritesRef = ref(db,`users/${user.uid}/garage/favorites`);
        const unsubscribe = onValue(favoritesRef, (snapshot) => {
            const favoritesData = snapshot.val();
            if(favoritesData){
                const vehiclesArray = Object.keys(favoritesData).map((key) => {
                    return {
                        id: key,
                        ...favoritesData[key]
                    }
                });;
                console.log(JSON.stringify(vehiclesArray));
                setVehicles(vehiclesArray.reverse());
            }
            setFetchingStatus(FETCH_STATUS.SUCCESS);
        }, (error) => {
            console.error("Error reading favorites: ", error);
            setFetchingStatus(FETCH_STATUS.ERROR);
        });
        return () => off(favoritesRef, 'value', unsubscribe);

    }, [user.uid])

    return (
        <View style={{backgroundColor: Colors.BACKGROUND, paddingHorizontal: styleVariables.paddingHorizontal, flex: 1}}>
            {fetchingStatus === FETCH_STATUS.LOADING && <ActivityIndicator color={Colors.PRIMARY} size='large'/>}
            {fetchingStatus === FETCH_STATUS.SUCCESS && <VehicleList navigation={navigation} vehicles={vehicles} />}
        </View>
    )
}

export default HomeMainComponent

const stylee = StyleSheet.create({})