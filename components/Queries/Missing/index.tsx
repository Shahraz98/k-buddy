import React from 'react';
import styles from '../styles';
import { DefListProps} from '../../../types';
import {Text} from 'react-native';
import Row from '../../Row';

const Missing = ({items}: DefListProps) => {

return (
<>
<Text style={styles.headerText}>Ingredients missing data</Text> 
    <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 10, marginBottom: 10}}>(no items will be shown if every item is complete.)</Text>
    {items ?
    items.filter((product) => {
        if(product.category === '' || product.brand === '' || product.confection === '' || product.expiry === '' || product.location === ''){
            return product; }
    }).map((product) => <Row key={product.id} item={product}/> ) : <Text style={{marginRight: 'auto', marginLeft: 'auto'}}>Loading ..</Text>
    }
</>
)}

export default Missing;