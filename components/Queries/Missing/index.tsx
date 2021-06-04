import React from 'react';
import mystyle from '../../../constants/mystyle';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator} from 'react-native';
import Row from '../../Row';
import Colors from '../../../constants/Colors'

const Missing = ({items}: DefListProps) => {

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Ingredients missing data</Text> 
<Text style={[mystyle.centered, mystyle.xsText, {marginBottom: 10}]}>(no items will be shown if every item is complete.)</Text>
    {items ?
    items.filter((product) => {
        if(product.name === 'Name not found' || product.category === '' || product.category === 'Category not found' || product.brand === '' || product.brand === 'Brand not found' || 
        product.confection === '' || product.expiry === '' || product.location === ''){
            return product; }
    }).map((product) => <Row key={product.id} item={product}/> ) : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
    }
</>
)}

export default Missing;