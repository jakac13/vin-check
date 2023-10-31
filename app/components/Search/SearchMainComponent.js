import { StyleSheet, Text, View, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import CarDetailsComponent from './CarDetailsComponent';
import Colors from '../../utilities/Colors';
import { styleVariables } from '../../utilities/GlobalConstants';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSize } from '../../utilities/GlobalConstants';

export default SearchMainComponent = () => {

    const [carData, setCarData] = useState(null);
    const [animationSpeed, setAnimationSpeed] = useState(0.1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('WDD2040081A103553');
    const [errorState, setError] = useState('');

    const setSearchInputState = (text) => {
        setSearchInput(text);
    }

    useEffect(()=>{
        console.log(searchInput)
    }, [searchInput])

    async function fetchVehicles() {
        try {
            Keyboard.dismiss();
            setIsLoading(true);
            setAnimationSpeed(1.5)
            const response = await axios.get(`https://api-aw46ycnrva-ey.a.run.app/api/v0/vehicles?vin=${searchInput}`);
            console.log(response.data.status)
            setCarData(response.data.result);
            console.log(JSON.stringify(response.data.result));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                switch(error.response.status) {
                    case 400:
                        setError('Vozila ne najdemo. Znova preverite VIN številko.');
                        break;
                    case 500:
                        setError('Napaka na strežniku.');
                        break;
                    default:
                        setError('Prišlo je do napake: ' + error.message);
                        break;
                }
              } else if (error.request) {
                console.log(error.request);
                setError('Network Error: Please check your internet connection.');
              } else {
                console.log('Error', error.message);
                setError('Prišlo je do napake: ' + error.message);
              }
              console.log(error.config);
        } finally {
            setIsLoading(false);
            setAnimationSpeed(0.1)
            if (errorState) {
                Alert.alert('Error', errorState);
            }
        }
      }

    return (
            <SafeAreaView style={{backgroundColor: Colors.BACKGROUND, paddingHorizontal: styleVariables.paddingHorizontal,}}>
                <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' stickyHeaderIndices={[1]} style={{backgroundColor: Colors.BACKGROUND}}>
                    <Text style={{fontFamily: 'Poppins-Bold', fontSize: fontSize.title, paddingTop: 10 }}>Poišči vozilo</Text>
                    <View style = {[styles.stickyHeaderContainer]}>
                        <SearchComponent isLoading={isLoading} fetchVehicles={fetchVehicles} setSearchInputState={setSearchInputState}/>
                    </View>
                    <View style = {[styles.viewContainer]}>
                        <CarDetailsComponent isLoading={isLoading} carData={carData} animationSpeed={animationSpeed}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: Colors.BACKGROUND, 
        gap: 20,
    },
    stickyHeaderContainer: {
        backgroundColor: Colors.BACKGROUND, 
        paddingBottom: 20,
        paddingTop: 5
    }
})