import { View, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Colors from '../../utilities/Colors';
import { Feather } from '@expo/vector-icons';
import { fontSize } from '../../utilities/GlobalConstants';
import Button from '../reusable/Button';
import { FETCH_STATUS } from '../../api/fetchStatus';

const SearchComponent = (props) => {
    const [searchInput, setSearchInput] = useState('3mddj6hv51m132887');

    // 3mddj6hv51m132887
    // vf1rfb00557744840
    // wauzzz4f46n046732
    // sjnfaaj11u1302566

    return (
        <View style={{flexDirection: 'row', width: '100%', gap: 10,}}>
            <View 
                style = {{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: Colors.EXTRA_GRAY,
                }}>
                <Feather name="search" size={19} style={{color: Colors.PRIMARY}}/>
                <TextInput
                    onChangeText={(text) => setSearchInput(text)}
                    placeholder="VIN številka..."
                    placeholderTextColor={Colors.EXTRA_GRAY}
                    value={searchInput}
                    style={{
                        flex:1,
                        fontSize: fontSize.body, 
                        fontFamily: 'Poppins-Regular',
                        color: Colors.PRIMARY, 
                    }}
                />
            </View>
            <Button disabled={props.status === FETCH_STATUS.LOADING} onPress={() => props.fetchVehicleHandler(searchInput)} label='Išči'/>
        </View>
    )
}

export default SearchComponent