import React from 'react';
import {View, Text} from 'react-native';
import { RowProps} from '../../../../types';
import { AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {ProgressBar} from 'react-native-paper';
import {formatDistanceToNow,isAfter} from 'date-fns'
import Colors from '../../../../constants/Colors'
import mystyle from '../../../../constants/mystyle'

const RowTop = ({product}: RowProps) => {

const translateRipeness = (ripeness:string) => {
    if(ripeness === 'Underripe') return 0.1;
    if(ripeness === 'Barely Ripe') return 0.2;
    if(ripeness === 'Ripe') return 0.4;
    if(ripeness === 'Very Ripe') return 0.5;
    else return 1;
}

return (
<View style={mystyle.myClmContainer}>
    <View style={mystyle.myRowHeader}>
        <Text style={[mystyle.whiteText, mystyle.bigText, {fontWeight: 'bold', marginRight: 5}]}>{product.name}</Text>
    </View>
    <View style={mystyle.myRowHeader}>
        <Text style={[mystyle.coloredText, {marginRight: 1}]}>in {product.location}.</Text>
    </View>

    <Text style={[mystyle.whiteText, {marginTop: 5}]}>Added {formatDistanceToNow(new Date(product.addedOn), { addSuffix: true })} 
    <AntDesign name="check" size={14} color={Colors.light.tint} /></Text>

    {isAfter(new Date(), new Date(product.expiry!))? 
    <Text style={[mystyle.coloredText, {marginTop: 5}]}>Expired <MaterialCommunityIcons name="alert-circle" size={14} color={Colors.light.tint} /></Text>
    : <Text style={[mystyle.whiteText, {marginTop: 5}]}>Expiring {product.expiry? formatDistanceToNow(new Date(product.expiry), { addSuffix: true }) : ''} <AntDesign name="clockcircleo" size={14} color={Colors.light.tint} /></Text>}

    <Text style={[mystyle.whiteText, {marginTop: 5}]}>Confection Type: {product.confection} <SimpleLineIcons name="bag" size={16} color={Colors.light.tint} /></Text>
    {product.isOpen? <Text style={[mystyle.coloredText, {marginTop: 5}]}>OPEN</Text>
    : <Text style={[mystyle.coloredText, {marginTop: 5}]}>CLOSED</Text>}

    {product.maturity?
    <View style={[mystyle.centered,{marginVertical: 15}]}>
        <Text style={[mystyle.centered,mystyle.whiteText]}>Checked {formatDistanceToNow(new Date(product.maturitydate!), { addSuffix: true })} as: 
        <Text style={mystyle.coloredText}> {product.maturity}</Text></Text>
        <ProgressBar 
        style={[mystyle.centered, mystyle.myProgress, mystyle.myMainWhiteBtn]} 
        progress={translateRipeness(product.maturity)} 
        color={Colors.light.tint}/>
    </View>
    : <View></View>}
</View>
)}

export default RowTop;