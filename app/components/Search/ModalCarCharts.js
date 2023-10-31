import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Colors from '../../utilities/Colors';
import Button from '../reusable/Button';
import { styles, styleVariables } from '../../utilities/GlobalConstants';
import { LineChart, LineChartBicolor } from 'react-native-gifted-charts';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Feather } from '@expo/vector-icons'; 


export default function ModalCarCharts(props) {
    const deviceHeight = Dimensions.get('screen').height;
    const deviceWidth = Dimensions.get('window').width;
    const animation = useRef(null);

    const isValidData = props.kmData !== null && props.kmData !== undefined;
    const chartData = isValidData ? Object.entries(props.kmData).map(([year, km]) => {
        return {value: km, label: year};
    }) : [];

    const getOffset = () => {
        let offset = 30000;
        if(props.fraudYears.length) {
            offset = props?.fraudYears[0]?.currentKmYear - 70000;
        }

        return offset;
    }

    return (
        <View>
            <Modal
            statusBarTranslucent={true}
            deviceHeight={deviceHeight}
            onBackdropPress={() => props.toggleModal()}
            hideModalContentWhileAnimating={true}
            animationIn={'fadeInUp'}
            onBackButtonPress={() => props.toggleModal()}
            isVisible={props.isVisible}>
            <View style={{ maxHeight:600, backgroundColor: Colors.BACKGROUND, borderRadius: 10, padding: 20, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                <View style={{marginBottom: 20}}>
                    <Text style={[styles.textTitle]}>Zgodovina prevoženih kilometrov</Text>
                    <Text style={[styles.textLabel, {marginBottom: 10}]}>Tukaj najdete spremembe prevoženih kilometrov skozi čas.</Text>
                    
                    {
                    isValidData ?
                    <View style={{overflow: 'hidden', paddingBottom: 30}}>
                        {(props.fraudYears.length) ? 
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 10}}>
                        <Feather name="alert-circle" size={16} color={Colors.SECONDARY} style={{transform: [{translateY: -2}]}}/>
                        {props.fraudYears.map((year) => {
                                return (
                                    <Text style={[styles.textData]} key={year}>{year.fraudYear}</Text>
                                )
                            })}
                        </View> : null}
                        <View style= {{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: [{translateX: -50}, {translateY: -50}],}}>
                            <LottieView
                                ref={animation}
                                autoPlay = {true}
                                speed={1}
                                loop = {false}
                                source={require('../../../assets/swipe-left.json')}
                                style={{width: 130, height: 130}}
                            />
                        </View> 
                        <LineChart noOfSections={4} yAxisOffset={getOffset()} yAxisLabelWidth={60} rotateLabel color={Colors.PRIMARY} dataPointsColor={Colors.SECONDARY} isAnimated data={chartData} data2={chartData} focusEnabled showStripOnFocus showTextOnFocus/>
                    </View>
                    : 
                    <View style={{padding: 40, marginVertical: 10}}>
                        <LottieView 
                            ref={animation}
                            autoPlay = {true}
                            loop={false}
                            source={require('../../../assets/emptyState.json')}
                            />
                    </View>
                    }
                </View>
                <Button label={'Zapri'} onPress={props.toggleModal} />
            </View>
            </Modal>
        </View>
    );
}

