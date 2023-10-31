import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Colors from '../../utilities/Colors';
import Button from '../reusable/Button';
import { styles } from '../../utilities/GlobalConstants';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

/* textTitle: hasWarnings ? 'Potential Issues Detected!' : 'Everything Seems Fine!',
subTitle: hasWarnings ? 'The following issues have been detected with this vehicle.' : 'No issues have been detected with this vehicle.',
color: hasWarnings ? Colors.SECONDARY : Colors.PRIMARY,
info: {
    warningKmText: (isWarnKm === 1) ? 'Potential odometer fraud!' : 'No signs of odometer fraud.',
    warningStatusText: (isWarnTehPregled === 1) ? 'Vehicle has a history of failed or partially passed inspections!' : 'Vehicle has a history of flawless technical inspections.',
} */

export default function ModalWarnings(props) {

    const hasWarnings = props.checkForWarnings();
    const isWarnKm = props.potentialFraud;
    const isWarnTehPregled = props.inspectionIssuesFound;

    const generateIconContainerStyle = (isWarning) => {
        return {
            padding: 10,
            borderRadius: 5,
            backgroundColor: isWarning ? Colors.SECONDARY : Colors.TERTIARY
        }
    }

    const generateInfoContainerStyle = (isWarning) => {
        return {
            flexDirection:'column', 
            alignItems: 'flex-start', 
            gap: 10, 
            marginBottom: 10, 
            backgroundColor: isWarning ? '#ffebe6' : '#f6fff8', 
            padding: 10, 
            borderRadius: 10, 
            justifyContent:'center',
            borderWidth: 1,
            borderColor: Colors.BACKGROUND_SECONDARY
        }
    }

    const getModalContentAndStyle = () => {
        return {
            textTitle: hasWarnings ? 'Odkrite morebitne težave!' : 'Vse se zdi vredu!',
            subTitle: hasWarnings ? 'Pri tem vozilu so bile ugotovljene naslednje težave.' : 'Pri vozilu ni bilo najdenih morebitnih težav.',
            color: hasWarnings ? Colors.SECONDARY : Colors.PRIMARY,
            info: {
                warningKmText: (isWarnKm === 1) ? 'Potencialna goljufija s prevrtenim števcem kilometrov ali nepravilen vnos podatkov!' : 'Ni znakov goljufije števca prevoženih kilometrov.',
                warningStatusText: (isWarnTehPregled === 1) ? 'Vozilo ima zgodovino neuspešnih ali delno opravljenih pregledov!' : 'Vozilo ima zgodovino brezhibnih tehničnih pregledov.',
            }
        };
    }
    
    const deviceHeight = Dimensions.get('screen').height;

    return (
        <View>
            <Modal
            statusBarTranslucent={true}
            deviceHeight={deviceHeight}
            onSwipeComplete={props.toggleModal} 
            swipeDirection={['up', 'down', 'left', 'right']} 
            onBackdropPress={() => props.toggleModal()}
            hideModalContentWhileAnimating={true}
            animationIn={'jello'}
            onBackButtonPress={() => props.toggleModal()}
            isVisible={props.isVisible}>
            <View style={{ maxHeight: 500, backgroundColor: Colors.BACKGROUND, borderRadius: 10, padding: 20, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                <View style={{marginBottom: 20}}>
                    <Text style={[styles.textTitle, {color: getModalContentAndStyle().color}]}>{getModalContentAndStyle().textTitle}</Text>
                    <Text style={[styles.textLabel, {marginBottom: 10}]}>{getModalContentAndStyle().subTitle}</Text>
                    <View>
                        <View style={generateInfoContainerStyle(isWarnKm === 1)}>
                            <View style={generateIconContainerStyle(isWarnKm === 1)}>
                                <Ionicons name="speedometer" size={19} color="white" />
                            </View>
                            <Text style={[styles.textLabel, {fontFamily: 'Poppins-Regular'}]}>{getModalContentAndStyle().info.warningKmText}</Text>
                        </View>
                        <View style={generateInfoContainerStyle(isWarnTehPregled === 1)}>
                            <View style={generateIconContainerStyle(isWarnTehPregled === 1)}>
                                <Feather name="activity" size={19} color="white" />
                            </View>
                            <Text style={[styles.textLabel, {fontFamily: 'Poppins-Regular'}]}>{getModalContentAndStyle().info.warningStatusText}</Text>
                        </View>
                    </View>
                </View>
                <Button label={'Zapri'} onPress={props.toggleModal} />
            </View>
            </Modal>
        </View>
    );
}

export const stylesModal = StyleSheet.create({
    infoContainer: {
        flexDirection:'column', 
        alignItems: 'flex-start', 
        gap: 10, 
        marginBottom: 10, 
        backgroundColor: '#f6fff8', 
        padding: 10, 
        borderRadius: 10, 
        justifyContent:'center',
        borderWidth: 1,
        borderColor: Colors.BACKGROUND_SECONDARY
    },
})
