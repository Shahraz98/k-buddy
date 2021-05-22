import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebase.js';
import {View, Text} from 'react-native';
import { ProductType } from '../../types';
import Square from '../Square';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type FilterProps = {
    filterby: string, //Property, e.g. location, category, confection
    filterto: string  //Property name, e.g. fridge, fruit, fresh
    }

const Filter = ({filterby, filterto}:FilterProps) => {

    const [tempList, settempList] = useState<ProductType[] | undefined>(undefined);
    const [show, setShow] = useState<boolean>(false)
    
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
   <View >
       <TouchableOpacity onPress={() => setShow(!show)}>
           <Text style={{marginRight: 'auto',  marginLeft: 'auto', marginTop: 20, color: '#30303b'}}>{filterto}</Text>
       </TouchableOpacity>

       {show?
       <View style={{flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto', flexWrap: 'wrap'}}>
           {   tempList?
           tempList.map((product) => <Square key={product.id} proname={product.name}></Square>)
           : <Text style={{marginRight: 'auto', marginLeft: 'auto'}}>Loading ..</Text>
           }
        </View> 
        : <Text></Text> 
        }
</View>


)}

export default Filter;