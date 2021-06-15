import React from 'react';
import mystyle from '../../../constants/mystyle';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors'
import Displayer from '../../Displayer';

const Missing = ({items}: DefListProps) => {
    const myList =  items? items.filter((product) => {
        if(product.name === 'Name not found' || product.category === '' || product.category === 'Category not found' || product.brand === '' || product.brand === 'Brand not found' || 
        product.confection === '' || product.expiry === '' || product.location === '' || product.maturity === 'N/A'){
            return product; }
    }) : []

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Ingredients missing data</Text>
    {items ? 
    <Displayer colored={true} items={myList} text='No Ingredients missing data.' shape='Short'></Displayer>
    : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
    }
</>
)}

export default Missing;