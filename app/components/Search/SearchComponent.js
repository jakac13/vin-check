import { View, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from '../../utilities/Colors';
import { Feather } from '@expo/vector-icons';
import { fontSize } from '../../utilities/GlobalConstants';
import Button from '../reusable/Button';

const SearchComponent = (props) => {

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
                    borderWidth: 1,
                    borderColor: Colors.EXTRA_GRAY,
                }}>
                <Feather name="search" size={19} style={{color: Colors.PRIMARY}}/>
                <TextInput
                    onChangeText={(text) => props.setSearchInputState(text)}
                    placeholder="VIN številka..."
                    placeholderTextColor={Colors.EXTRA_GRAY}
                    style={{
                        flex:1,
                        fontSize: fontSize.body, 
                        fontFamily: 'Poppins-Regular',
                        color: Colors.PRIMARY, 
                    }}
                />
            </View>
            <Button disabled={props.isLoading} onPress={props.fetchVehicles} label='Išči'/>
        </View>
    )
}

export default SearchComponent