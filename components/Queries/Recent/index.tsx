import React from 'react';
import { DefListProps} from '../../../types';
import {Text, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import mystyle from '../../../constants/mystyle';
import Square from '../../Square';
import Warning from '../../Warning';
import Colors from '../../../constants/Colors';

const Recent = ({items}: DefListProps) => {

const words = ['hour', 'minute','second'] //Used to filter recently added items
const myList = items? items.filter((product) => formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[2]) > -1) : [];

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Recently added</Text>
<View style={[{flexDirection: 'row',flexWrap: 'wrap', marginBottom: 50}]}>
  {items? 
    myList.length != 0? myList.map((product) => <Square key={product.id} proname={product.name} proadd={product.addedOn} proexp={product.expiry? product.expiry : ''}></Square>)
    : <View style={[mystyle.centered, {marginVertical: 50}]}>
    <Warning 
    subText='No additions during the last 24 hours.'
    positive={false}
    subColor={Colors.light.tint}
    iconColor={Colors.light.tint}></Warning></View> 
    : <View></View>
  }
  </View>
</>
)}

export default Recent;