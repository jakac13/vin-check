import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Search from '../screens/Search';
import Colors from '../utilities/Colors';
import { Feather } from '@expo/vector-icons';
import {styleVariables, fontSize} from '../utilities/GlobalConstants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    title: 'Dobrodošel nazaj!',
                    headerShadowVisible: false,
                    headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
                    headerStyle: {backgroundColor: Colors.BACKGROUND},
                    headerTintColor: Colors.PRIMARY,
                    tabBarIcon: ({ focused }) => (
                        <Feather name="home" size={19} style={{color: focused ? Colors.PRIMARY : Colors.EXTRA_GRAY}}/>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? `${Colors.PRIMARY}` : `${Colors.EXTRA_GRAY}`, fontFamily: focused ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: 10 }}>
                          Home
                        </Text>
                    ),
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={Search} 
                options={{
                    headerShown:false,
                    title: 'Poišči vozilo',
                    headerShadowVisible: true,
                    headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
                    headerStyle: {backgroundColor: Colors.BACKGROUND},
                    headerTintColor: Colors.PRIMARY,
                    tabBarIcon: ({ focused }) => (
                        <Feather name="search" size={19} style={{color: focused ? Colors.PRIMARY : Colors.EXTRA_GRAY}}/>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? `${Colors.PRIMARY}` : `${Colors.EXTRA_GRAY}`, fontFamily: focused ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: 10 }}>
                          Search
                        </Text>
                    ),
                
                }}
            />

        </Tab.Navigator>
    )
}