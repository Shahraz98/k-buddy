import React from 'react';
import {View, Text} from 'react-native';
import { ProductProps} from '../../../../types';
import { AntDesign, EvilIcons} from '@expo/vector-icons'; 
import {ProgressBar} from 'react-native-paper';
import {formatDistanceToNow} from 'date-fns'
import Colors from '../../../../constants/Colors'
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';
import ColoredView from '../../../ColoredView';

const RowTop = ({item}: ProductProps) => {

const translateRipeness = (ripeness:string) => {
    //Returning the progress status based on ripeness
    switch(ripeness){
        case 'Underripe':
        return 0.1;
        case 'Barely Ripe': 
        return 0.2;
        case 'Ripe':
        return 0.5;
        case 'Very Ripe':
        return 0.8;
        case 'Overripe':
        return 1;
        default: 
        return 0;
    }
}

return (
<View style={mystyle.myClmContainer}>
   <View style={mystyle.myRowHeader}>
        <View>
          <Text style={[mystyle.blackText, mystyle.bigText, {fontWeight: 'bold', marginRight: 5}]}>{item.name}</Text>
          <Text style={[mystyle.coloredText, {marginRight: 1, marginTop: 3}]}>by {item.brand? item.brand : 'N/A'}</Text>
        </View>
        <AntDesign style={{marginLeft: 'auto', marginBottom: 'auto'}} name='smileo' size={35} color={Colors.light.tsecondary}/>
    </View>
    <View style={[mystyle.myRowHeader, {marginBottom: 15, marginTop: 20}]}>
      <ColoredView item={item}></ColoredView>
      <View style={{marginLeft: 'auto'}}>
        <View style={{marginLeft: 'auto'}}>
            <EvilIcons name="clock" style={mystyle.centered} size={50} color={Colors.light.tsecondary}/>
            <Text style={[mystyle.secondaryBlack, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>Expiring</Text>
            <Text style={[mystyle.secondaryBlack, mystyle.centered, mystyle.xsText, {marginTop: 2}]}>{formatDistanceToNow(new Date(item.expiry), { addSuffix: true })}</Text>
        </View>
      </View>
    </View>
    {item.maturity?
    <View style={[mystyle.centered,{marginVertical: 15}]}>
        <Text style={[mystyle.centered,mystyle.blackText, mystyle.xsText]}>Set {formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true })} as: 
        <Text style={mystyle.secondaryColored}> {item.maturity}</Text></Text>
        <ProgressBar style={[mystyle.centered, mystyle.myProgress, mystyle.myMainWhiteBtn]} 
        progress={translateRipeness(item.maturity)} 
        color={Colors.light.tint}/>
    </View> : <View></View>}
</View>
)}

export default RowTop;