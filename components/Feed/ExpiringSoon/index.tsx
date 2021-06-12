import React, {useState, useEffect}from 'react';
import {ActivityIndicator, View} from 'react-native';
import { formatDistanceToNow, isAfter} from 'date-fns'
import Colors from '../../../constants/Colors';
import { ProductType, DefListProps} from '../../../types';
import mystyle from '../../../constants/mystyle';
import ArrowNav from '../../ArrowNav';
import Displayer from '../../Displayer';

const ExpiringSoon = ({items}: DefListProps) => {
const [myList, setMyList] =  useState<ProductType[] | undefined>(undefined) //used to filter out items that do not have an expiry
const words = ['hour', 'minute','second'] //Used to filter dates and determine items soon expiring
const twentyFourList = myList? myList.filter((product) => formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[2]) > -1).filter((product) => isAfter(new Date(), new Date(product.expiry!)) === false) : []
const ripeList = myList? myList.filter((product) => product.maturity === 'Ripe').filter((product) => isAfter(new Date(), new Date(product.expiry!)) === false) : []
const expiredList = myList? myList.filter((product) => isAfter(new Date(), new Date(product.expiry!)) === true) : []

useEffect(()=> {
const tempList:ProductType[] = items.filter((i) => i.expiry != '');
setMyList(tempList);
}, [items]);

return (
<>
{myList?
<View>
<ArrowNav comp1={<Displayer items={expiredList} text='No expired Ingredients found.'></Displayer>} 
comp2={<Displayer items={twentyFourList} text='No ingredient is going to expire within 24 hours.' shape='Square'></Displayer>} 
comp3={<Displayer items={ripeList} text='No ripe Ingredients found.'></Displayer>} 
text1='Expired Ingredients' text2='Expiring within 24 hours' text3='Ripe Ingredients'></ArrowNav>
</View>
: <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.dsecondary} />}
</>
)}

export default ExpiringSoon;