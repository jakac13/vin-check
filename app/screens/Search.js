import { View } from 'react-native'
import React from 'react'
import SearchMainComponent from '../components/Search/SearchMainComponent';
import Colors from '../utilities/Colors';
;

export default function Search() {
    return (
        <View style={{backgroundColor: Colors.BACKGROUND, flex: 1}}>
            <SearchMainComponent displaySearchBar={true}/>
        </View>
    )
}
