import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { ProductType } from '../../types';
import Square from '../Square';
import {FilterProps} from '../../types';
import mystyle from '../../constants/mystyle'
import Colors from '../../constants/Colors';
import {getProducts} from '../../utils/actions';

const Filter = ({filterby, filterto}:FilterProps) => {
    const [tempList, settempList] = useState<ProductType[] | undefined>(undefined);
    
    useEffect(()=> {
        const ProductRef = getProducts();
        //Get data from Firebase and filter based on property and property name
        ProductRef.orderByChild(filterby).equalTo(filterto).on("value", (snap) => {
            const el = snap.val();
            const tempoList:Array<ProductType> = [];
            for (let id in el){
                tempoList.push({id, ...el[id]});
            }
            settempList(tempoList);
        });
    }, []);
    

return (
   <View>
       <Text style={[mystyle.centered, mystyle.smText, mystyle.coloredText, {marginTop: 20}]}>{filterto}</Text>
       <View style={[{flexDirection: 'row',flexWrap: 'wrap'}]}>
           {tempList?
           tempList.map((product) => <Square key={product.id} proname={product.name} proadd={product.addedOn} proexp={product.expiry? product.expiry : ''}></Square>)
           : <ActivityIndicator style={mystyle.centered} size="large" color={Colors.light.tint} />
           }
       </View> 
   </View>
)}

export default Filter;