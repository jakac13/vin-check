import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utilities/Colors'
import { styleVariables, styles, fontSize } from '../utilities/GlobalConstants'
import Button from '../components/reusable/Button'
import LottieView from 'lottie-react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import Toast from 'react-native-toast-message';
import { FETCH_STATUS } from '../api/fetchStatus'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);

    const showToast = (type, message) => {
        Toast.show({
          type: type,
          text1: 'Prišlo je do napake',
          text2: message,
        });
    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        setStatus(FETCH_STATUS.LOADING);
        if(email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setStatus(FETCH_STATUS.SUCCESS);
            } catch (e) {
                handleErrorMessage(e);
                setStatus(FETCH_STATUS.ERROR);
            }
        } else {
            setEmailError(true);
            setPasswordError(true);
            setStatus(FETCH_STATUS.ERROR);
            showToast('error', 'Potreben je vnos e-poštnega naslova in gesla.')
        }
    }

    const handleErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/weak-password':
                showToast('error', 'Prešibko geslo - Geslo mora vsebovati minimalno 6 znakov.')
                setEmailError(false);
                setPasswordError(true);
                break;
            case 'auth/invalid-email':
                showToast('error', `Oblika e-poštnega naslova ${email} je nepravilna.`)
                setPasswordError(false);
                setEmailError(true);
                break;
            case 'auth/email-already-in-use':
                showToast('error', `E-poštni naslov ${email} že obstaja.`)
                setPasswordError(false);
                setEmailError(true);
                break;
            default:
                showToast('error', error.message)
                break;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={style.screenContainer}>
                <View style= {style.animationContainer}>
                <LottieView
                    autoPlay = {true}
                    speed={0.5}
                    loop = {true}
                    source={require('../../assets/car2.json')}
                    style={{width: 200, height: 200}}
                />
                </View> 
                <View style={{alignItems: 'flex-start', marginBottom: 40}}>
                    <View style={style.inputWrapper}>
                        <Text style={[styles.textLabel]}>E-pošta</Text>
                        <TextInput
                            editable={status !== FETCH_STATUS.LOADING}
                            value={email}
                            textContentType='emailAddress'
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Vpiši e-poštni naslov..."
                            placeholderTextColor={Colors.EXTRA_GRAY}
                            autoCapitalize='none'
                            style={[style.textInput, 
                                {borderColor: emailError ? '#ff6d64': Colors.EXTRA_GRAY},
                                {borderWidth: emailError ? 1 : StyleSheet.hairlineWidth}]}
                        />
                    </View>
                    <View style={{width: '100%', marginBottom: 20}}>
                        <Text style={[styles.textLabel]}>Geslo</Text>
                        <TextInput
                            editable={status !== FETCH_STATUS.LOADING}
                            value={password}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Vpiši geslo..."
                            placeholderTextColor={Colors.EXTRA_GRAY}
                            autoCapitalize='none'
                            style={[style.textInput, 
                                {borderColor: passwordError ? '#ff6d64': Colors.EXTRA_GRAY},
                                {borderWidth: passwordError ? 1 : StyleSheet.hairlineWidth}]}
                        />
                    </View>
                    <View style={{width: '100%'}}>
                        {status !== FETCH_STATUS.LOADING 
                        ? <Button disabled={status === FETCH_STATUS.LOADING} label={'Registriraj se!'} onPress={() => handleSubmit()}></Button>
                        : <ActivityIndicator style={{marginTop: 10}} color={Colors.PRIMARY} size='large'/>}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Register

const style = StyleSheet.create({
    screenContainer: {
        justifyContent: 'center', 
        backgroundColor: Colors.BACKGROUND, 
        flex: 1, 
        paddingHorizontal: styleVariables.paddingHorizontal,
    },
    inputWrapper: {
        width: '100%', marginBottom: 10
    },
    animationContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 50
    },
    textInput: {
        fontSize: 
        fontSize.body, 
        fontFamily: 'Poppins-Regular',
        color: Colors.EXTRA_GRAY,
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: '100%',
        borderRadius: 5
    },
})