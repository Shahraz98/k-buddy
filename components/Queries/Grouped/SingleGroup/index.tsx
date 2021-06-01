import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Filter from '../../../Filter';
import {GroupProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons'; 


const SingleGroup = ({items, filterby, groupIcon}: GroupProps) => {
    const defList: string[] = []; 
    const [show, setShow] = useState<boolean>(false);

return (
<View style={{marginTop: 30}}>
    <TouchableOpacity onPress={() => setShow(!show)} style={[mystyle.centered, {width: '60%', borderBottomWidth: 0.5, borderColor: Colors.light.tint}]}>
    <View style={[mystyle.myQueriesRow, mystyle.centered, {marginTop: 'auto'}]}>
            <Text style={[mystyle.myQueriesText, mystyle.centered, mystyle.stnText, mystyle.blackText]}>View by {filterby}</Text>
    </View>
    </TouchableOpacity>
    {show? 
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
    </View> : <View><MaterialIcons name={groupIcon} size={35} style={[mystyle.centered, {marginTop: 30}]} color={Colors.light.tint} /></View>} 
    </View> 
)}

export default SingleGroup;