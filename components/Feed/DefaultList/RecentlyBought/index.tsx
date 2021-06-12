import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { DefListProps, ProductType} from '../../../../types';
import Displayer from '../../../Displayer';
import { formatDistanceToNow} from 'date-fns'

const RecentlyBought = ({items}: DefListProps) => {
const [myList, setMyList] =  useState<ProductType[] | undefined>(undefined)
const words = ['hour', 'minute','second']
const recentList = myList? myList.filter((product) => formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.boughtOn!), { addSuffix: true }).indexOf(words[2]) > -1) : [] 
    
useEffect(()=> {
        const tempList:ProductType[] = items.filter((i) => i.recentlyBought === true);
        setMyList(tempList);
}, [items]);

return (
<>
{recentList?
<Displayer items={recentList} text='Recently bought'></Displayer>
: <View></View>
}
</>
)}

export default RecentlyBought;