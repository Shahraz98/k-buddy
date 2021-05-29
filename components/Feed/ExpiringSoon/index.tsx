import React, {useState, useEffect}from 'react';
import {Text, ActivityIndicator} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Colors from '../../../constants/Colors';
import mystyle from '../../../constants/mystyle';
import Row from '../../Row';
import { ProductType, DefListProps} from '../../../types';

const ExpiringSoon = ({items}: DefListProps) => {
const [freshList, setfreshList] =  useState<ProductType[] | undefined>(undefined)
const words = ['day', 'hour', 'minute','second'] //Used to filter moment dates and determine items soon expiring

useEffect(()=> {
const tempList:Array<ProductType> = items.filter((i) => i.expiry != '');
setfreshList(tempList);
}, [items]);

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Expiring soon</Text>
   {freshList ?
     freshList.filter((product) => formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[0]) > -1 
     || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[1]) > -1
     || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[2]) > -1
     || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[3]) > -1
     || product.maturity === 'Ripe').map((product, i) => <Row key={i} item={product}/>)
     : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
   }
</>
)}

export default ExpiringSoon;