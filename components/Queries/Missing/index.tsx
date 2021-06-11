import React from 'react';
import mystyle from '../../../constants/mystyle';
import { DefListProps} from '../../../types';
import {Text, ActivityIndicator, View} from 'react-native';
import Row from '../../Row';
import Colors from '../../../constants/Colors'
import Warning from '../../Warning';

const Missing = ({items}: DefListProps) => {
    const myList =  items? items.filter((product) => {
        if(product.name === 'Name not found' || product.category === '' || product.category === 'Category not found' || product.brand === '' || product.brand === 'Brand not found' || 
        product.confection === '' || product.expiry === '' || product.location === '' || product.maturity === 'Not specified'){
            return product; }
    }) : []

return (
<>
<Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Ingredients missing data</Text> 
    {items ? myList.length != 0? 
    <>{myList.map((product) => <Row key={product.id} item={product}/> )}</>
    : <View style={[mystyle.centered, {marginVertical: 50}]}>
    <Warning 
    subText='No ingredient is missing data.'
    positive={true}
    subColor={Colors.light.tint}
    iconColor={Colors.light.tint}></Warning></View> 
    : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
    }
</>
)}

export default Missing;