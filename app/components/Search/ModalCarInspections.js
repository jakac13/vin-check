import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Colors from '../../utilities/Colors';
import Button from '../reusable/Button';
import { styles, styleVariables } from '../../utilities/GlobalConstants';
import { Feather } from '@expo/vector-icons'; 

export default function ModalCarInspections(props) {

    const getInspectionStatuses = (inspectionStatus) => {
        const inspectionStatuses = [];

        for(const year in inspectionStatus) {
            const statuses = Array.isArray(inspectionStatus[year]) ? inspectionStatus[year] : [inspectionStatus[year]];
            statuses.forEach(status => {
                inspectionStatuses.push({ year, status });
            });
        }
        return inspectionStatuses;
    }

    const inspectionStatuses = getInspectionStatuses(props.inspectionStatuses);
    console.log(inspectionStatuses);

    const deviceHeight = Dimensions.get('screen').height;
    return (
        <View>
        <Modal
            propagateSwipe
            statusBarTranslucent={true}
            deviceHeight={deviceHeight}
            onBackdropPress={() => props.toggleModal()}
            hideModalContentWhileAnimating={true}
            animationIn={'fadeInUp'}
            onBackButtonPress={() => props.toggleModal()}
            isVisible={props.isVisible}>
            <View style={{ maxHeight: 500, backgroundColor: Colors.BACKGROUND, borderRadius: 10, padding: 20, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                <View style={{marginBottom: 20}}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View>
                        <Text style={[styles.textTitle, {color: Colors.PRIMARY}, {marginBottom: 10}, {scrollY:''}]}>Zgodovina tehničnih pregledov</Text>
                        <View>
                            {inspectionStatuses.map((item, index) => {
                                return (
                                    <Text 
                                        key={index} 
                                        style={[styles.textLabel, (
                                            item.status.includes("ni brezhiben - kritična napaka") || item.status.includes("pogojno brezhiben") || item.status === 'ni brezhiben') ? {color: Colors.SECONDARY} : {}]}>
                                            {`${item.year} - ${item.status}`}</Text>
                                )
                            })}
                        </View>
                        </View>
                    </ScrollView>
                </View>
                <Button label={'Zapri'} onPress={props.toggleModal} />
            </View>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({})