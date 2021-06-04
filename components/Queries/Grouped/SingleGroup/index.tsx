import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Filter from '../../../Filter';
import {GroupProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import {LinearGradient} from 'expo-linear-gradient';


const SingleGroup = ({items, filterby, groupIcon}: GroupProps) => {
    const defList: string[] = [];

return (
<View>
<View><MaterialIcons name={groupIcon} size={30} style={[mystyle.centered, {marginTop: 15}]} color={Colors.light.tint} /></View>
    <View>
        {items?
        items.map( (product) =>{ 
            if(filterby === 'Category'){
            if(defList.indexOf(product.category!) > -1) {
            return <View key={product.id}></View>
        } else {
            defList.push(product.category!);
            return <Filter key={product.id} filterby="category" filterto={product.category!}></Filter>}}
            else if(filterby === 'Location'){
                if(defList.indexOf(product.location!) > -1) {
                return <View key={product.id}></View>
            } else {
                defList.push(product.location!);
            return <Filter key={product.id} filterby="location" filterto={product.location!}></Filter>}}
            else {
                if(defList.indexOf(product.confection!) > -1) {
                return <View key={product.id}></View>
            } else {
                defList.push(product.confection!);
            return <Filter key={product.id} filterby="confection" filterto={product.confection!}></Filter>}}
          }
        )
        : <View></View>
        }
    </View>
    </View> 
)}

export default SingleGroup;