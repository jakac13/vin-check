import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, {useRef, useState} from 'react'
import Colors from '../../utilities/Colors'
import LottieView from 'lottie-react-native';
import { styles } from '../../utilities/GlobalConstants';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ModalWarnings from './ModalWarnings';
import ModalCarCharts from './ModalCarCharts';
import ModalCarInspections from './ModalCarInspections';


const CarDetailsComponent = (props) => {
  const [isModalWarningsVisible, setModalWarningsVisible] = useState(false);
  const [isModalCarChartsVisible, setModalCarChartsVisible] = useState(false);
  const [isModalCarInspectionsVisible, setModalCarInspectionsVisible] = useState(false);

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

  const kmDriven = () => {
    const kmRange = props?.carData?.razpon_km;
    const km = props?.carData?.km;
    let result = {text: 'No data', color: 'black'}

    if (kmRange === '+0'){
      result = {text: '0-10.000', color: 'green'}
    } else if (kmRange === '+10000') {
      result = {text: km, color: 'green'}
    } else if(kmRange === '+50000') {
      result = {text: km, color: '#a3cc61'}
    } else if(kmRange === '+100000') {
      result = {text: km, color: '#a2a63c'}
    } else if(kmRange === '+150000') {
      result = {text: km, color: '#a2a63c'}
    } else if (kmRange === '+200000') {
      result = {text: km, color: 'orange'}
    } else if (kmRange === '+300000') {
      result = {text: km, color: 'red'}
    }
    return result;
  }

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

      if (currentKmYear < prevKmYear) {
        fraudYears.push({
          fraudYear: currentYear,
          currentKmYear: currentKmYear,
        });
        potentialFraud = 1;
      }

    }
    return {potentialFraud, fraudYears};
  }

    const animation = useRef(null);
    return (
      (!props.carData || props.isLoading) ? 
        <View style= {{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
              ref={animation}
              autoPlay = {true}
              speed={props.animationSpeed}
              loop = {true}
              source={require('../../../assets/car.json')}
              style={{width: 200, height: 200}}
          />
        </View> 
      : 
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
              <TouchableOpacity onPress={() => toggleModalWarnings()}>
                <View style={{ backgroundColor: iconProps.backgroundColor, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                  <Feather name={iconProps.name} size={19} color={Colors.TEXT_SECONDARY} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableHighlight underlayColor={Colors.TERTIARY} style={{padding: 10 ,flex: 1, backgroundColor: Colors.PRIMARY, borderRadius: 5}} onPress={() => toggleModalCarCharts()}>
                <View style={{alignItems: 'center' }}>
                  <MaterialCommunityIcons name="speedometer" size={19} color={Colors.TEXT_SECONDARY} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={Colors.TERTIARY} style={{padding: 10 ,flex: 1, backgroundColor: Colors.PRIMARY, borderRadius: 5}} onPress={() => toggleModalCarInspections()}>
                <View style={{alignItems: 'center' }}>
                  <MaterialCommunityIcons name="car-wrench" size={19} color={Colors.TEXT_SECONDARY} />
                </View>
              </TouchableHighlight>
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
                  <Text style={[styles.textData, {color: kmDriven().color}]}>
                  {kmDriven().text}
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
        </View>
      </View>
    )
  }

export default CarDetailsComponent
