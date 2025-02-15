import { View, Text } from 'react-native'
import React from 'react'
import Welcome from '../screens/Welcome'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../utilities/Colors';
import { styleVariables, fontSize } from '../utilities/GlobalConstants';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function UserAuth() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="Welcome" 
              component={Welcome} 
              options={{title: 'Začnimo!',
                        headerShown: false,
                        headerShadowVisible: false,
                        headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
                        headerStyle: {backgroundColor: Colors.BACKGROUND},
                        headerTintColor: Colors.PRIMARY,
              }}/>
              <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{title: 'Prijavi se!',
                        headerShadowVisible: false,
                        headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
                        headerStyle: {backgroundColor: Colors.BACKGROUND},
                        headerTintColor: Colors.PRIMARY,
              }}/>
              <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{title: 'Registriraj se!',
                        headerShadowVisible: false,
                        headerTitleStyle: {fontFamily: 'Poppins-Bold', fontSize: fontSize.title},
                        headerStyle: {backgroundColor: Colors.BACKGROUND},
                        headerTintColor: Colors.PRIMARY,
              }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}