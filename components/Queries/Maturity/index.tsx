import React, {useState, useEffect} from 'react';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Colors from '../../../constants/Colors'
import Row from '../../Row';
import { ProductType } from '../../../types';
import mystyle from '../../../constants/mystyle';
import Rectangle from '../../Rectangle';

const Maturity = ({items}: DefListProps) => {

    const [freshList, setfreshList] =  useState<ProductType[] | undefined>(undefined) 
    const ripewords = ['2 days','a day', 'hour', 'second', 'minute'] 

    useEffect(()=> {
    const tempList:Array<ProductType> = items.filter((i) => i.maturity != undefined);
    setfreshList(tempList);
    }, []);

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Unchecked Ripeness</Text>
<Text style={[mystyle.centered, mystyle.xsText, {marginBottom: 10}]}>(no items will be shown if every item has been checked recently.)</Text>
<View style={{flex: 1, flexDirection: 'row'}}>
{freshList? 
   freshList.filter((product) => product.confection === 'Fresh').filter( (item) => formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[0]) === false 
   && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[1]) === false
   && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[2]) === false
   && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[3]) === false
   && formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[4]) === false).map((product) => <Rectangle key={product.id} item={product}/>)
   : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
}</View>
</>
)}

export default Maturity;