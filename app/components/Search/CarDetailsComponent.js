import { Text, View, TouchableOpacity, TouchableHighlight, ActivityIndicator, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Colors from '../../utilities/Colors'
import LottieView from 'lottie-react-native';
import { styles, styleVariables, fontSize } from '../../utilities/GlobalConstants';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ModalWarnings from './ModalWarnings';
import ModalCarCharts from './ModalCarCharts';
import ModalCarInspections from './ModalCarInspections';
import { Entypo } from '@expo/vector-icons'; 
import { FETCH_STATUS, SAVE_STATUS } from '../../api/fetchStatus';
import { saveCarInGarage } from '../../api/firebaseWS';
import { showToastMessage } from '../reusable/Toast';
import { getAuth } from 'firebase/auth';
import { kmDriven } from '../../utilities/helpers';

const CarDetailsComponent = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [isModalWarningsVisible, setModalWarningsVisible] = useState(false);
  const [isModalCarChartsVisible, setModalCarChartsVisible] = useState(false);
  const [isModalCarInspectionsVisible, setModalCarInspectionsVisible] = useState(false);
  const [savingStatus, setSavingStatus] = useState(SAVE_STATUS.IDLE);
  const [comment, setComment] = useState("");

  const toggleModalWarnings = () => {
    setModalWarningsVisible(!isModalWarningsVisible);
  };

  const toggleModalCarCharts = () => {
    setModalCarChartsVisible(!isModalCarChartsVisible);
  };

  const toggleModalCarInspections = () => {
    setModalCarInspectionsVisible(!isModalCarInspectionsVisible);
  };

  const getDateParsed = (originalDate) => {
    const dateParts = originalDate?.split("-");
    const formattedDate = `${dateParts[2]}.${parseInt(dateParts[1])}.${dateParts[0]}`;
    return formattedDate;
  }

  const handleSaveInGarage = async () => {
    try {
        setSavingStatus(SAVE_STATUS.LOADING);
        await saveCarInGarage(user.uid, props.carData, potentialFraud, inspectionIssuesFound, comment)
        props.setIsCarSaved(true);
        setSavingStatus(SAVE_STATUS.SUCCESS);
        showToastMessage('success', 'Super!', `Vozilo je bilo uspešno dodano med priljubljena vozila.`);
    } catch (error) {
        setSavingStatus(SAVE_STATUS.ERROR);
        showToastMessage('error', 'Prišlo je do napake', ` ${error}`);
        props.setIsCarSaved(false);
    }
}
  
  const checkForTechnicalInspectionIssues = (inspectionStatus) => {
    let inspectionIssuesFound = 0;
    let errorMessages = [];

    for(let year in inspectionStatus){
      const yearlyStatus = inspectionStatus[year];
      if(Array.isArray(yearlyStatus)){
        yearlyStatus.forEach(status => {
          if(status.includes("ni brezhiben - kritična napaka") || status.includes("pogojno brezhiben") || status === "ni brezhiben"){
            inspectionIssuesFound = 1;
            errorMessages.push({ year, status });
          }
        })
      }

      else if (yearlyStatus.includes("ni brezhiben - kritična napaka") || 
             yearlyStatus.includes("pogojno brezhiben") || 
             yearlyStatus === "ni brezhiben") {
        inspectionIssuesFound = 1;
        errorMessages.push({ year, status: yearlyStatus });
      }
    }
    return { inspectionIssuesFound, errorMessages };
  }

  const inspectionStatus = props?.carData?.his?.teh_pregled_status;
  const { inspectionIssuesFound, errorMessages } = checkForTechnicalInspectionIssues(inspectionStatus);
  const kmStatus = props?.carData?.his?.km;
  const {potentialFraud, fraudYears} = checkOdometerFraud(kmStatus);

  const checkForWarnings = () => {
    return (potentialFraud === 1 || inspectionIssuesFound === 1);
  }

  const checkImport = () => {
    return (props?.carData?.uvozeno === 0) ? 'DA' : 'NE';
  }

  const iconProps = checkForWarnings()
    ? { name: "alert-circle", backgroundColor: Colors.SECONDARY }
    : { name: "check-circle", backgroundColor: Colors.TERTIARY };

  function checkOdometerFraud (kmData) {
    const fraudYears = [];
    let potentialFraud = 0;

    if(!kmData){
      return {potentialFraud, fraudYears};
    }
    const kmEntries = Object.entries(kmData);

    if(kmEntries <= 1){
      return {potentialFraud, fraudYears};
    }

    for(let i = 1; i < kmEntries.length; i++){
      const prevKmYear = kmEntries[i - 1][1];
      const currentKmYear = kmEntries[i][1];
      const currentYear = kmEntries[i][0];

      if (currentKmYear <= prevKmYear) {
        fraudYears.push({
          fraudYear: currentYear,
          currentKmYear: currentKmYear,
        });
        potentialFraud = 1;
      }

    }
    return {potentialFraud, fraudYears};
  }

    return (
        <>
          {props.status === FETCH_STATUS.LOADING && 
            <View style= {{justifyContent: 'center', alignItems: 'center'}}>
              <LottieView
                  autoPlay={true}
                  loop={true}
                  source={require('../../../assets/car.json')}
                  style={{width: '100%', aspectRatio: 16/9}}
              />
            </View> 
          }
    
          {props.status === FETCH_STATUS.SUCCESS && 
            <View style={{backgroundColor: Colors.BACKGROUND_SECONDARY, borderRadius: 10, padding: 20}}>
              {isModalWarningsVisible && (
                <ModalWarnings potentialFraud={potentialFraud} inspectionIssuesFound={inspectionIssuesFound} checkForWarnings={checkForWarnings} carData={props.carData} isVisible={isModalWarningsVisible} toggleModal={toggleModalWarnings}/>
              )}

              {isModalCarChartsVisible && (
                <ModalCarCharts fraudYears={fraudYears} kmData={props.carData.his.km} isVisible={isModalCarChartsVisible} toggleModal={toggleModalCarCharts}/>
              )}

              {isModalCarInspectionsVisible && (
                <ModalCarInspections inspectionStatuses={props.carData.his.teh_pregled_status} isVisible={isModalCarInspectionsVisible} toggleModal={toggleModalCarInspections}/>
              )}

              <View style={{flexDirection: 'column'}}>
                <View style={{marginBottom: 20, flexDirection: 'column', }}>
                  <View style={{flexDirection: 'row', justifyContent:'space-between',  marginBottom: 10, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems:'center', gap: 10}}>
                      <FontAwesome5 style={{transform: [{translateY: -2}]}} name="car" size={19} color="black" />
                      <Text style={styles.textTitle}>
                        Podatki o vozilu
                      </Text>
                    </View>
                    {savingStatus !== SAVE_STATUS.LOADING && !props.isCarSaved && !props?.vehicleData?.vehicleComment && 
                    <TouchableHighlight 
                    underlayColor={ Colors.TERTIARY} 
                    onPress={() => handleSaveInGarage()} 
                    style={{ backgroundColor: null, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="cards-heart-outline" size={19} color="black" />
                    </TouchableHighlight>
                    }
                    {savingStatus !== SAVE_STATUS.LOADING && props.isCarSaved && 
                    <View style={{padding: 10, borderRadius: 5, alignItems: 'center'}}>
                      <Feather name="check" size={19} color={Colors.TERTIARY} />
                    </View>
                    }
                    {savingStatus === SAVE_STATUS.LOADING && 
                    <ActivityIndicator size="small" color={Colors.PRIMARY} />
                    }
                    
                  </View>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <TouchableHighlight underlayColor={Colors.TERTIARY} style={{padding: 10 ,flex: 1, backgroundColor: Colors.PRIMARY, borderRadius: 5}} onPress={() => toggleModalCarCharts()}>
                      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', position:'relative'  }}>
                        <MaterialCommunityIcons name="speedometer" size={19} color={Colors.TEXT_SECONDARY} />
                        {potentialFraud == 1 && <Entypo style={{position:'absolute', right: 25, bottom: 7}} name="dot-single" size={19} color={Colors.SECONDARY} />}
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={Colors.TERTIARY} style={{padding: 10 ,flex: 1, backgroundColor: Colors.PRIMARY, borderRadius: 5}} onPress={() => toggleModalCarInspections()}>
                      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', position:'relative' }}>
                        <MaterialCommunityIcons name="car-wrench" size={19} color={Colors.TEXT_SECONDARY} />
                        {inspectionIssuesFound == 1 && <Entypo style={{position:'absolute', right: 25, bottom: 7}} name="dot-single" size={19} color={Colors.SECONDARY} />}
                      </View>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => toggleModalWarnings()}>
                      <View style={{ backgroundColor: iconProps.backgroundColor, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                        <Feather name={iconProps.name} size={19} color={Colors.TEXT_SECONDARY} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginBottom: 10}}>
                  <Text style={styles.textLabel}>
                    Vozilo
                  </Text>
                  <Text style={styles.textData}>
                  {`${props?.carData?.znamka.toUpperCase()} ${props?.carData?.model_detail.toUpperCase()}`}
                  </Text>
                </View>
                <View style={{flexDirection:'column', justifyContent:'flex-start', flexWrap: 'wrap', columnGap: 20, rowGap: 10}}>
                    <View>
                      <Text style={styles.textLabel}>
                        Barva
                      </Text>
                      <Text style={styles.textData}>
                      {props?.carData?.barva_detail.toUpperCase()}
                      </Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', rowGap: 10, columnGap: 40}}>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Gorivo
                        </Text>
                        <Text style={styles.textData}>
                        {props?.carData?.gorivo.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Prevoženi km
                        </Text>
                        <Text style={[styles.textData, {color: kmDriven(props.carData).color}]}>
                        {kmDriven(props.carData).text}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Država izvora
                        </Text>
                        <Text style={[styles.textData]}>
                        {props?.carData?.drzava_izvora.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Kategorija
                        </Text>
                        <Text style={[styles.textData]}>
                        {props?.carData?.katgorija.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Masa
                        </Text>
                        <Text style={[styles.textData]}>
                        {`${props?.carData?.masa} kg`}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Prostornina
                        </Text>
                        <Text style={[styles.textData]}>
                        {`${props?.carData?.motor_v} ccm`}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Moč
                        </Text>
                        <Text style={[styles.textData]}>
                        {`${props?.carData?.motor_moc} kW`}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Uvoženo
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                          {props?.carData?.uvozeno === 0 ? <Feather style={{transform: [{translateY: -2}],}} name="globe" size={16} color={Colors.PRIMARY} /> : null}
                          <Text style={[styles.textData]}>
                          {checkImport()}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text style={styles.textLabel}>
                          Prva registracija
                        </Text>
                        <Text style={[styles.textData]}>
                        {getDateParsed(props?.carData?.prva_registracija)}
                        </Text>
                      </View>
                      <View style={styles.dataContainer}>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={[styles.textLabel, {}]}>
                          Prva registracija (SI)
                        </Text>
                        <Text style={[styles.textData]}>
                        {getDateParsed(props?.carData?.prva_registracija_slo)}
                        </Text>
                      </View>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={styles.textLabel}>Komentar</Text>
                  <TextInput 
                  placeholder={!props?.vehicleData?.vehicleComment ?'Komentar o vozilu...' : props?.vehicleData?.vehicleComment} 
                  numberOfLines={4}
                  editable={!props?.vehicleData?.vehicleComment}
                  multiline
                  textContentType='none'
                  textAlignVertical='top'
                  style={[style.textInput, {backgroundColor: !props?.vehicleData?.vehicleComment ? Colors.TEXT_SECONDARY : null}]}
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                  placeholderTextColor={Colors.EXTRA_GRAY}/>
                </View>
              </View>
            </View>
          }
      </>
    )
  }

export default CarDetailsComponent

const style = StyleSheet.create({
  screenContainer: {
      justifyContent: 'center', 
      backgroundColor: Colors.BACKGROUND, 
      flex: 1, 
      paddingHorizontal: styleVariables.paddingHorizontal
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
      borderRadius: 5,
  },
})
