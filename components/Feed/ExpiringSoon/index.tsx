import React, {useState, useEffect}from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import { formatDistanceToNow, isAfter} from 'date-fns'
import Colors from '../../../constants/Colors';
import Row from '../../Row';
import { ProductType, DefListProps} from '../../../types';
import mystyle from '../../../constants/mystyle';
import Warning from '../../Warning';

const ExpiringSoon = ({items}: DefListProps) => {
const [myList, setMyList] =  useState<ProductType[] | undefined>(undefined) //used to filter out items that do not have an expiry
const words = ['hour', 'minute','second'] //Used to filter dates and determine items soon expiring
const newList = myList? myList.filter((product) => formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[2]) > -1
|| product.maturity === 'Ripe').filter((product) => isAfter(new Date(), new Date(product.expiry!)) === false) : []
const expiredList = myList? myList.filter((product) => isAfter(new Date(), new Date(product.expiry!)) === true) : []

useEffect(()=> {
const tempList:Array<ProductType> = items.filter((i) => i.expiry != '');
setMyList(tempList);
}, [items]);

return (
<>
{myList? 
<View>
  <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Within 24 hours</Text>
   {newList.length != 0?
     newList.map((product) => <Row key={product.id} item={product}/>)
     : <View style={[mystyle.centered, {marginVertical: 50}]}><Warning 
     positive={true} 
     subColor={Colors.light.gray} 
     iconColor={Colors.light.gray} 
     subText='No ingredient is going to expire within 24 hours.'></Warning></View>
   }
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Expired Ingredients</Text>
   {expiredList.length != 0? 
     expiredList.map((product) => <Row key={product.id} item={product}/>)
   : <View style={[mystyle.centered, {marginVertical: 50}]}><Warning 
   positive={true}
   subColor={Colors.light.gray} 
   iconColor={Colors.light.gray}  
   subText='No ingredient is expired.'></Warning></View>
   }
</View>
: <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.dsecondary} />}
</>
)}

export default ExpiringSoon;