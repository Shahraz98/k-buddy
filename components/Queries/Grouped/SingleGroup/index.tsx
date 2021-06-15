import React from 'react';
import {View} from 'react-native';
import Filter from '../../../Filter';
import {GroupProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'
import Colors from '../../../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons'; 

const SingleGroup = ({items, filterby, groupIcon}: GroupProps) => {
    const defList: string[] = []; //Array used to avoid duplicates in the group

return (
<View style={{marginBottom: 20}}>
    <View>
        {items?
        items.map( (product) =>{ 
            if(filterby === 'Category'){
                if(defList.indexOf(product.category!) > -1 || product.category === '' || product.category === "Category not found") {
                    return <View key={product.id}></View>
                } else {
                    defList.push(product.category!);
                    return <Filter key={product.id} filterby="category" filterto={product.category!}></Filter>
                }
            }
            else if(filterby === 'Location'){
                if(defList.indexOf(product.location!) > -1 || product.location === '') {
                    return <View key={product.id}></View>
                } else {
                    defList.push(product.location!);
                    return <Filter key={product.id} filterby="location" filterto={product.location!}></Filter>}
                }
            else {
                if(defList.indexOf(product.confection!) > -1 || product.confection === '') {
                    return <View key={product.id}></View>
                } else {
                    defList.push(product.confection!);
                    return <Filter key={product.id} filterby="confection" filterto={product.confection!}></Filter>}
            }
          }
        )
        : <View></View>
        }
    </View>
    </View> 
)}

export default SingleGroup;