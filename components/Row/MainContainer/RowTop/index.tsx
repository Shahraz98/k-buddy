import React from 'react';
import {View, Text} from 'react-native';
import { RowProps} from '../../../../types';
import { AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from '../styles';
import {ProgressBar} from 'react-native-paper';
import {formatDistanceToNow,isAfter} from 'date-fns'

const RowTop = ({product}: RowProps) => {

const translateRipeness = (ripeness:string) => {
    if(ripeness === 'Underripe') return 0.1;
    if(ripeness === 'Barely Ripe') return 0.2;
    if(ripeness === 'Ripe') return 0.4;
    if(ripeness === 'Very Ripe') return 0.5;
    else return 1;
}

return (
<>
    <View style={styles.columnContainer}>
        <View style={styles.rowHeader}>
            <Text style={styles.name}>{product.name}</Text>
        </View>
        <View style={styles.rowHeader}>
            <Text style={styles.location}>in {product.location}.</Text>
        </View>
        <Text style={styles.blueText}>Added {formatDistanceToNow(new Date(product.addedOn), { addSuffix: true })} <AntDesign name="check" size={14} color="#00FA9A" /></Text>
        {isAfter(new Date(), new Date(product.expiry!))? <Text style={[styles.blueText, {color: "#00FA9A"}]}>Expired <MaterialCommunityIcons name="alert-circle" size={18} color="#00FA9A" /></Text>
            : <Text style={styles.blueText}>Expiring {product.expiry? formatDistanceToNow(new Date(product.expiry), { addSuffix: true }) : ''} <AntDesign name="clockcircleo" size={14} color="#00FA9A" /></Text>}
    <Text style={styles.blueText}>Confection Type: {product.confection} <SimpleLineIcons name="bag" size={16} color="#00FA9A" /></Text>
    {product.maturity?
    <View style={{marginVertical: 15, marginRight: 'auto', marginLeft: 'auto'}}>
    <Text style={{marginRight: 'auto', marginLeft: 'auto', color: 'white'}}>Checked {formatDistanceToNow(new Date(product.maturitydate!), { addSuffix: true })} as: 
    <Text style={{color: '#00FA9A'}}> {product.maturity}</Text>
    </Text>
    <ProgressBar 
    style={{marginRight: 'auto', marginLeft: 'auto',backgroundColor: 'white', height: 10, width:230, borderRadius: 5, marginVertical: 10}} 
    progress={translateRipeness(product.maturity)} 
    color={'#00FA9A'}/>
    </View>
    : <View></View>}
    </View>
</>
)}

export default RowTop;