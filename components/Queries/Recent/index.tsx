import React from 'react';
import { DefListProps} from '../../../types';
import {Text, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import mystyle from '../../../constants/mystyle';
import Square from '../../Square';
import Warning from '../../Warning';
import Colors from '../../../constants/Colors';
import Displayer from '../../Displayer';

const Recent = ({items}: DefListProps) => {

const words = ['hour', 'minute','second'] //Used to filter recently added items
const myList = items? items.filter((product) => formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(words[2]) > -1) : [];

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Recently added</Text>
<View style={{marginBottom: 50}}>
  {items? 
    <Displayer items={myList} text='No additions during last 24 hours.' shape='Square'></Displayer>
    : <View></View>
  }
  </View>
</>
)}

export default Recent;