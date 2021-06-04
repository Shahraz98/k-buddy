import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View, Button, TouchableOpacity, Text} from 'react-native';
import firebase from '../../utils/firebase';
import mystyle from '../../constants/mystyle'
import { ProductType } from '../../types';
import Grouped from './Grouped';
import Maturity from './Maturity';
import Missing from './Missing';
import Recent from './Recent';
import Colors from '../../constants/Colors'

const Queries = () => {

const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
const [showfiltered, setShowFiltered] = useState<boolean>(true)

useEffect(()=> {
    const ProductRef = firebase.database().ref("Product");
    ProductRef.on("value", (snapshot) => {
        const elements = snapshot.val();
        const productList:Array<ProductType> = [];
        for (let id in elements){
            productList.push({id, ...elements[id]});
        }
        setdisplayList(productList);
    })
}, []);

return (
<ScrollView style={mystyle.myFeedContainer}>
<View style={[mystyle.centered, mystyle.myNav]}>
    <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showfiltered? Colors.light.background : 'white'}]} onPress={() => setShowFiltered(true)}>
        <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.blackText, {paddingHorizontal: 10}]}>Filtered Views</Text>
        </TouchableOpacity>
        <View style={{height: 50,width: 10,backgroundColor: 'white'}}></View>
        <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showfiltered? 'white' : Colors.light.background}]} onPress={() => setShowFiltered(false)}>
        <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.blackText, {paddingHorizontal: 10}]}>Additional Info</Text>
        </TouchableOpacity>
    </View>
    {showfiltered?
    displayList? <Grouped items={displayList}></Grouped> 
    : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
    : <View style={{marginTop: 10}}>
        { displayList? <Maturity items={displayList}></Maturity> : <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />} 
      <View>
        { displayList? <Missing items={displayList}></Missing> : <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />} 
      </View>
      <View>
        { displayList? <Recent items={displayList}></Recent> : <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />} 
      </View>
      </View>}
</ScrollView>
)}

export default Queries;