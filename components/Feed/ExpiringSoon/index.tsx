import React, {useState, useEffect}from 'react';
import {Text} from 'react-native';
import { formatDistanceToNow} from 'date-fns'
import styles from '../styles';
import Row from '../../Row';
import { ProductType, DefListProps} from '../../../types';

const ExpiringSoon = ({items}: DefListProps) => {
const [freshList, setfreshList] =  useState<ProductType[] | undefined>(undefined)

    useEffect(()=> {
    const tempList:Array<ProductType> = items.filter((i) => i.expiry != '');
    setfreshList(tempList);
    }, [items]);

const words = ['day', 'hour', 'minute','second'] //Used to filter moment dates and determine items soon expiring

return (
<>
<Text style={styles.headerText}>Expiring soon</Text>
   {freshList ?
   freshList.filter((product) => formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[0]) > -1 
   || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[1]) > -1
   || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[2]) > -1
   || formatDistanceToNow(new Date(product.expiry!), { addSuffix: true }).indexOf(words[3]) > -1
   || product.maturity === 'Ripe').map((product, i) => <Row key={i} item={product}/>)
    : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
    }
</>
)}

export default ExpiringSoon;