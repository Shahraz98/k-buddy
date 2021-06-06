import React from 'react';
import { DefListProps} from '../../../types';
import {Text, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import mystyle from '../../../constants/mystyle';
import Square from '../../Square';

const Recent = ({items}: DefListProps) => {

const words = ['year', 'month'] //Used to filter recently added items

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Added during last month</Text>
<View style={[{flexDirection: 'row',flexWrap: 'wrap'}]}>
  {items? 
    items.filter((product) => formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[0]) < 1 
    && formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[1]) < 1).map((product) => <Square key={product.id} proname={product.name} proadd={product.addedOn} proexp={product.expiry? product.expiry : ''}></Square>)
    : <View></View>
  }
  </View>
</>
)}

export default Recent;