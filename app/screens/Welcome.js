import {  Pressable, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../utilities/Colors'
import { styleVariables, styles, fontSize } from '../utilities/GlobalConstants'
import Button from '../components/reusable/Button'
import LottieView from 'lottie-react-native';

const Welcome = ({ navigation }) => {
  return (
          <SafeAreaView style={{flex: 1}}>
            <View style={{justifyContent: 'center', backgroundColor: Colors.BACKGROUND, flex: 1, paddingHorizontal: styleVariables.paddingHorizontal}}>
              <View style= {{justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
                <LottieView
                    autoPlay = {true}
                    speed={0.5}
                    loop = {true}
                    source={require('../../assets/car2.json')}
                    style={{width: 200, height: 200}}
                />
              </View> 
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.textHeadline, {marginBottom: 50, textAlign: 'center', lineHeight: 50}]}>Dobrodošel v <Text style={{color: Colors.TERTIARY, fontSize: 42, fontFamily: 'Poppins-ExtraBold'}}>CarCheck</Text>
                </Text>
                <View style={{width: '100%'}}>
                  <Button label={'Registriraj se'} onPress={() => navigation.navigate('Register')}></Button>
                </View>
                <View style={{flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                  <Text style={styles.textLabel}>Ali že imaš račun?</Text>
                  <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.textData, {color: Colors.TERTIARY, fontSize: fontSize.body2}]}>Prijavi se</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </SafeAreaView>
  )
}
export default Welcome
