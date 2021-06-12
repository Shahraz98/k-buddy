import React, {useState, useEffect} from 'react';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Colors from '../../../constants/Colors'
import { ProductType } from '../../../types';
import mystyle from '../../../constants/mystyle';
import Rectangle from '../../Rectangle';
import Warning from '../../Warning';
import Displayer from '../../Displayer';

const Maturity = ({items}: DefListProps) => {

    const [freshList, setfreshList] =  useState<ProductType[] | undefined>(undefined) 
    const ripewords = ['2 days','a day', 'hour', 'second', 'minute'] 

    useEffect(()=> {
    const tempList:Array<ProductType> = items.filter((i) => i.maturity != undefined);
    setfreshList(tempList);
    }, []);

    const myList = freshList? freshList.filter((product) => product.confection === 'Fresh' || product.confection === 'Frozen').filter( (item) => formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[0]) === false 
    && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[1]) === false
    && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[2]) === false
    && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[3]) === false
    && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[4]) === false) : []

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Unchecked Ripeness</Text>
{freshList?
   <Displayer items={myList} text='All Ingredients have been checked recently.' shape='Rectangle'></Displayer>
   : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
}
</>
)}

export default Maturity;