import React, {useState, useEffect}from 'react';
import {ActivityIndicator} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Colors from '../../../constants/Colors';
import Row from '../../Row';
import { ProductType, DefListProps} from '../../../types';
import mystyle from '../../../constants/mystyle';

const ExpiringSoon = ({items}: DefListProps) => {
const [myList, setMyList] =  useState<ProductType[] | undefined>(undefined) //used to filter out items that do not have an expiry
const words = ['hour', 'minute','second'] //Used to filter dates and determine items soon expiring

useEffect(()=> {
const tempList:Array<ProductType> = items.filter((i) => i.expiry != '');
setMyList(tempList);
}, [items]);

return (
<>
   {myList ?
     myList.filter((product) => formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[0]) > -1 
     || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[1]) > -1
     || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[2]) > -1
     || product.maturity === 'Ripe').map((product, i) => <Row key={i} item={product}/>)
     : <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.dsecondary} />
   }
</>
)}

export default ExpiringSoon;