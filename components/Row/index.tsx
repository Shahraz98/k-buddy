import React from 'react';
import {View} from 'react-native';
import MainContainer from './MainContainer';
import {ProductProps} from '../../types';

const Row = ({item}: ProductProps) => {
    
    return (
    <View style={{width: '100%', flexDirection: 'row'}}>
        <MainContainer product={item}/>
    </View>
    )
}

export default Row;