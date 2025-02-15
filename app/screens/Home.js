import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import Colors from '../utilities/Colors';
import Button from '../components/reusable/Button';
import HomeMainComponent from '../components/Home/HomeMainComponent';

export default function Home({navigation}) {
    return (
        <View style={{backgroundColor: Colors.BACKGROUND, flex: 1}}>
            <HomeMainComponent navigation={navigation}/>
        </View>
    )
}

