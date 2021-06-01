import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebase';
import {View, Text, ActivityIndicator} from 'react-native';
import { ProductType } from '../../types';
import Square from '../Square';
import {FilterProps} from '../../types';
import mystyle from '../../constants/mystyle'
import Colors from '../../constants/Colors';

const Filter = ({filterby, filterto}:FilterProps) => {
    const [tempList, settempList] = useState<ProductType[] | undefined>(undefined);
    
    useEffect(()=> {
        const ProductRef = firebase.database().ref("Product");
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
       <View style={[mystyle.centered, {flexDirection: 'row',flexWrap: 'wrap'}]}>
           {tempList?
           tempList.map((product) => <Square key={product.id} proname={product.name} proadd={product.addedOn} proexp={product.expiry? product.expiry : ''}></Square>)
           : <ActivityIndicator style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
           }
       </View> 
   </View>
)}

export default Filter;