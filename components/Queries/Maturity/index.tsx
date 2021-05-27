import React, {useState, useEffect} from 'react';
import styles from '../styles';
import { DefListProps} from '../../../types';
import {Text} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import Row from '../../Row';
import { ProductType } from '../../../types';

const Maturity = ({items}: DefListProps) => {

    const [freshList, setfreshList] =  useState<ProductType[] | undefined>(undefined)
    const ripewords = ['2 days','a day', 'hour', 'second', 'minute','year', 'month'] //Used to filter ripeness status check of items and recently added items

    useEffect(()=> {
    const tempList:Array<ProductType> = items.filter((i) => i.maturity != undefined);
    setfreshList(tempList);
    }, []);

return (
<>
<Text style={styles.headerText}>Unchecked Ripeness</Text>
<Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 10, marginBottom: 10}}>(no items will be shown if every item has been checked recently.)</Text>
{freshList?
freshList.filter((product) => product.confection === 'Fresh').filter( (item) => formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[0]) === false 
&& formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[1]) === false
&& formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[2]) === false
&& formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[3]) === false
&& formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true }).includes(ripewords[4]) === false).map((product) => <Row key={product.id} item={product}/>)
: <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
}
</>
)}

export default Maturity;