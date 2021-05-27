import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNowStrict} from 'date-fns';


export type SquareProps = {
proname: string,
proexp: string,
proadd: string,
}

const Square = ({proname, proadd, proexp}: SquareProps) => {
    const added:Array<string> = formatDistanceToNowStrict(new Date(proadd), { addSuffix: false }).split(' ');
    const expired:Array<string> = formatDistanceToNowStrict(new Date(proexp), { addSuffix: false }).split(' ');
    
return (
<View style={{
    backgroundColor: '#FFFFFF', 
    borderRadius: 15, width: 105, height: 80, 
    marginLeft: 15, marginTop: 10, shadowColor: 'black',
    shadowOffset: {
     width: 0,
     height: 1
   },
   shadowOpacity: 0.3,}}>
    <Text style={{marginLeft: 10, marginRight: 'auto', color: Colors.light.tint, marginTop: 5, marginBottom: 'auto', fontWeight: 'bold', fontSize: 11}}>{proname}</Text>
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}>
    <Text style={{fontSize: 11}}>Added </Text>
    <Text style={{fontSize: 11}}> Expiring</Text></View>
    <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginBottom: 5}}>
<View style={{flexDirection: 'column', marginRight: 10}}><Text style={{fontSize: 16, color: Colors.light.tint}}>{added[0]}</Text><Text style={{fontSize: 11}}>{added[1]}</Text></View>
        <View style={{flexDirection: 'column', marginRight: 10}}><Text style={{fontSize: 16, color: Colors.light.tint}}>{expired[0]}</Text><Text style={{fontSize: 11}}>{expired[1]}</Text></View>
    </View>
</View>
</View>
)}

export default Square;