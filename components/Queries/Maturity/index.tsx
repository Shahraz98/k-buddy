import React, {useState, useEffect} from 'react';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator, View} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Colors from '../../../constants/Colors'
import { ProductType } from '../../../types';
import mystyle from '../../../constants/mystyle';
import Rectangle from '../../Rectangle';
import Warning from '../../Warning';

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
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
{freshList?
   myList.length > 0?
   <>{myList.map((product) => <Rectangle key={product.id} item={product}/>)}</>
   : <View style={mystyle.centered}>
    <Warning 
    mainText='Well done.' 
    subText='All fresh items have been checked regularly.'
    positive={true}
    mainColor={Colors.light.gray}
    subColor={Colors.light.tint}
    iconColor={Colors.light.tint}></Warning></View> 
   : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
}</View>
</>
)}

export default Maturity;