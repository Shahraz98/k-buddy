import React from 'react';
import {Text, View} from 'react-native';
import Filter from '../../../Filter';
import {GroupProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'


const SingleGroup = ({items, filterby}: GroupProps) => {
    const defList: string[] = []; 

return (
<View style={{marginBottom: 30}}>
    <View style={[mystyle.myQueriesRow, mystyle.centered]}>
            <Text style={[mystyle.myQueriesText, mystyle.centered, mystyle.stnText, mystyle.blackText]}>View by {filterby}</Text>
    </View>
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