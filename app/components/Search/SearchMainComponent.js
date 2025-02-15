import { StyleSheet, Text, View, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import CarDetailsComponent from './CarDetailsComponent';
import Colors from '../../utilities/Colors';
import { styleVariables, styles as style } from '../../utilities/GlobalConstants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSize } from '../../utilities/GlobalConstants';
import { fetchVehicle } from '../../api/fetchVehicle' 
import { getAuth } from 'firebase/auth';
import { FETCH_STATUS, SAVE_STATUS } from '../../api/fetchStatus';
import { showToastMessage } from '../reusable/Toast';
import { checkIfVehicleInFavorites } from '../../api/firebaseWS';

export default SearchMainComponent = (props) => {
    const [carData, setCarData] = useState(null);
    const [errorState, setError] = useState('');
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [isVehicleInFavorites, setVehicleInFavorites] = useState(false);
    const [isCarSaved, setIsCarSaved] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if(props.vehicleData) {
            fetchVehicleHandler(props.vehicleData.vin);
        }
    }, []);

    async function checkIfInFavorites(vin) {
        try {
            const existStatus = await checkIfVehicleInFavorites(user.uid, vin);
            setVehicleInFavorites(existStatus);
            console.log('Exist status: ' + JSON.stringify(existStatus))
        } catch (error) {
            showToastMessage('error', 'Prišlo je do napake', 'Napaka pri iskanju vozila med priljubljenimi vozili...')
        }
    }

    /* async function fetchVehicleHandler(vinNumber) {
        try {
            console.log(vinNumber)
            Keyboard.dismiss();
            setStatus(FETCH_STATUS.LOADING);
    
            const data = await fetchVehicle(vinNumber);

            if(data.result) {
                setCarData(data.result);
                setStatus(FETCH_STATUS.SUCCESS);
                setError('');
            }
            
        } catch (error) {
            console.log(error)
            let errorMessage = 'An error occurred';
            if (error.response) {
                switch(error.response.status) {
                    case 400:
                        errorMessage = 'Vozila ne najdemo. Preverite VIN številko.';
                        break;
                    case 500:
                        errorMessage = 'Napaka na strežniku.';
                        break;
                    default:
                        errorMessage = 'Prišlo je do napake: ' + error.message;
                        break;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: Please check your internet connection.';
            } else {
                errorMessage = 'Prišlo je do napake: ' + error.message;
            }
            setStatus(FETCH_STATUS.ERROR);
            setError(errorMessage);
        } finally {
            setIsCarSaved(false);
            if (errorState) {
                Alert.alert('Error', errorState);
            }
        }
    } */

    async function fetchVehicleHandler(vinNumber) {
        try {
            console.log("VIN Number:", vinNumber);
            Keyboard.dismiss();
            setStatus(FETCH_STATUS.LOADING);
    
            const vehicleData = await fetchVehicle(vinNumber);
    
            if (vehicleData) {
                setCarData(vehicleData); // Assuming vehicleData is the correct format
                setStatus(FETCH_STATUS.SUCCESS);
                setError('');
            } else {
                // Handle case where no vehicle is found
                setStatus(FETCH_STATUS.ERROR);
                setError('Vozila ne najdemo. Preverite VIN številko.');
            }
        } catch (error) {
            console.error("Error in fetchVehicleHandler:", error);
            setStatus(FETCH_STATUS.ERROR);
            setError('An error occurred: ' + error.message);
        } finally {
            setIsCarSaved(false);
            if (errorState) {
                Alert.alert('Error', errorState);
            }
        }
    }
    

    return (
        <SafeAreaView style={
            {backgroundColor: Colors.BACKGROUND, 
            paddingHorizontal: styleVariables.paddingHorizontal, 
            flex: 1}}>
            <ScrollView 
            showsVerticalScrollIndicator={false} 
            overScrollMode='never' 
            stickyHeaderIndices=
                {props.displaySearchBar ? [1] : []} style={{backgroundColor: Colors.BACKGROUND}}>
                {props.displaySearchBar && 
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: fontSize.title, paddingTop: 10 }}>Poišči vozilo</Text>}
                {props.displaySearchBar && 
                <View style = {[styles.stickyHeaderContainer]}>
                    <SearchComponent status={status} fetchVehicleHandler={fetchVehicleHandler}/>
                </View>}
                <View style={[styles.viewContainer]}>
                    <CarDetailsComponent vehicleData={props.vehicleData} isCarSaved={isCarSaved} setIsCarSaved={setIsCarSaved} status={status} carData={carData}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: Colors.BACKGROUND, 
        gap: 20,
        marginBottom: 20,
    },
    stickyHeaderContainer: {
        backgroundColor: Colors.BACKGROUND, 
        paddingBottom: 20,
        paddingTop: 5
    },
})