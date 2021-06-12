import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { DefListProps, ProductType} from '../../../../types';
import Displayer from '../../../Displayer';
import { formatDistanceToNow} from 'date-fns'

const RecentlyBought = ({items}: DefListProps) => {
const myList = items.filter((i) => i.recentlyBought === true);
const words = ['hour', 'minute','second']
const recentList = myList.filter((product) => formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[2]) > -1)

return (
<>
{recentList?
<Displayer items={recentList} text='No recently bought Ingredients.' shape='Bought'></Displayer>
: <View></View>
}
</>
)}

export default RecentlyBought;