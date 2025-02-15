import { View, Text, TouchableHighlight, TextInput } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Search from '../screens/Search';
import Colors from '../utilities/Colors';
import { Feather } from '@expo/vector-icons';
import {styleVariables, fontSize} from '../utilities/GlobalConstants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VehicleDetail from '../components/Home/VehicleDetail';
import { auth } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
      <HomeStack.Navigator>
        <HomeStack.Screen 
        options={{
            title: 'Garaža',
            headerShadowVisible: true,
            headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
            headerStyle: {backgroundColor: Colors.BACKGROUND},
            headerTintColor: Colors.PRIMARY,
            headerRight: () => (
                <View style={{ marginRight: 20}}>
                    <TouchableHighlight 
                        underlayColor={ Colors.SECONDARY} 
                        onPress={() => handleLogout()} 
                        style={{ backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Feather name="log-out" size={19} color="white" />
                    </TouchableHighlight>
                </View>
            )
        }} 
        name="Home" component={Home} />
        <HomeStack.Screen 
        options={{
            title: 'Podatki o vozilu',
            headerShadowVisible: true,
            headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
            headerStyle: {backgroundColor: Colors.BACKGROUND},
            headerTintColor: Colors.PRIMARY,
        }}
        name="VehicleDetail" 
        component={VehicleDetail} />
      </HomeStack.Navigator>
    );
  }

export default function TabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="HomeStack" 
                    component={HomeStackScreen} 
                    options={{
                        headerShown: false,
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
        </NavigationContainer>
    )
}