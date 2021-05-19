import React from 'react';
import {View} from 'react-native';
import MainContainer from './MainContainer';
import {ProductType} from '../../types';
import styles from './styles';

export type ProductProps = {
item: ProductType,
}

const Row = ({item}: ProductProps) => {
return (
<View style={styles.container}>
    <MainContainer product={item}/>
</View>
)
}

export default Row;