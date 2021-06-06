import React from 'react';
import {View, Text} from 'react-native';
import { RowProps} from '../../../../types';
import { AntDesign, Entypo, SimpleLineIcons, FontAwesome, MaterialCommunityIcons, EvilIcons} from '@expo/vector-icons'; 
import {ProgressBar} from 'react-native-paper';
import {formatDistanceToNow,isAfter} from 'date-fns'
import Colors from '../../../../constants/Colors'
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';

const RowTop = ({product}: RowProps) => {

const translateRipeness = (ripeness:string) => {
    //Returning the progress status based on ripeness, probably would have been nicer to use a switch statement
    if(ripeness === 'Underripe') return 0.1;
    if(ripeness === 'Barely Ripe') return 0.2;
    if(ripeness === 'Ripe') return 0.4;
    if(ripeness === 'Very Ripe') return 0.5;
    else return 1;
}

return (
<View style={mystyle.myClmContainer}>
   
    <View style={mystyle.myRowHeader}>
        <View>
        <Text style={[mystyle.blackText, mystyle.bigText, {fontWeight: 'bold', marginRight: 5}]}>{product.name}</Text>
        <Text style={[mystyle.coloredText, {marginRight: 1, marginTop: 3}]}>in {product.location}.</Text>
        </View>
        <Entypo style={{marginLeft: 'auto', marginBottom: 'auto'}} name={'leaf'} size={30} color={Colors.light.tsecondary}/>
    </View>
    <View style={[mystyle.myRowHeader, {marginBottom: 15, marginTop: 20}]}>
    <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.3, 0.5]}
              style={{borderRadius: 15}}>
    <View style={{borderWidth: 0.5, borderColor: Colors.light.tsecondary, paddingHorizontal: 10, paddingVertical: 10}}>
    <Text style={[mystyle.whiteText, mystyle.xsText]}>Added {formatDistanceToNow(new Date(product.addedOn), { addSuffix: true })} <AntDesign name="check" size={14} color={Colors.light.dsecondary} /></Text>
    <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}>Confection Type: {product.confection} <SimpleLineIcons name="bag" size={16} color={Colors.light.dsecondary} /></Text>
    {product.isOpen? <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}>Status: Open <FontAwesome name="dropbox" size={19} color={Colors.light.dsecondary} /></Text>
    : <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}>Status: Closed <MaterialCommunityIcons name="cube" size={19} color={Colors.light.dsecondary} /></Text>}
    </View>
    </LinearGradient>
   
    {product.expiry? 
    <View style={{marginLeft: 'auto'}}>
        {isAfter(new Date(), new Date(product.expiry))? 
        <View>
        <MaterialCommunityIcons name="alert-circle" style={mystyle.centered} size={55} color={Colors.light.tsecondary} />
        <Text style={[mystyle.secondaryColored, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>Expired</Text>
        <Text style={[mystyle.secondaryColored, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>{product.expiry? formatDistanceToNow(new Date(product.expiry), { addSuffix: true }) : ''}</Text></View>
        : <View style={{marginLeft: 'auto'}}><EvilIcons name="clock" style={mystyle.centered} size={65} color={Colors.light.tsecondary}/>
        <Text style={[mystyle.secondaryBlack, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>Expiring</Text>
        <Text style={[mystyle.secondaryBlack, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>{product.expiry? formatDistanceToNow(new Date(product.expiry), { addSuffix: true }) : ''}</Text></View>}
    </View>
    : <View></View>}
    </View>
    
    {product.maturity?
    <View style={[mystyle.centered,{marginVertical: 15}]}>
        <Text style={[mystyle.centered,mystyle.blackText]}>Checked {formatDistanceToNow(new Date(product.maturitydate!), { addSuffix: true })} as: 
        <Text style={mystyle.secondaryColored}> {product.maturity}</Text></Text>
        <ProgressBar 
        style={[mystyle.centered, mystyle.myProgress, mystyle.myMainWhiteBtn]} 
        progress={translateRipeness(product.maturity)} 
        color={Colors.light.tint}/>
    </View>
    : <View></View>}
</View>
)}

export default RowTop;