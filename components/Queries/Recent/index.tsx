import React from 'react';
import styles from '../styles';
import { DefListProps} from '../../../types';
import {Text, View} from 'react-native';
import Row from '../../Row';
import { formatDistanceToNow} from 'date-fns'

const Recent = ({items}: DefListProps) => {

const ripewords = ['2 days','a day', 'hour', 'second', 'minute','year', 'month'] //Used to filter ripeness status check of items and recently added items

return (
<>
<Text style={styles.headerText}>Added during last month</Text>
{   items?
    items.filter((product) => formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(ripewords[5]) < 1 
    && formatDistanceToNow(new Date(product.addedOn!), { addSuffix: true }).indexOf(ripewords[6]) < 1).map((product) => <Row key={product.id} item={product}/>)
    : <View></View>
}
</>
)}

export default Recent;