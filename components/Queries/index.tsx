import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import mystyle from '../../constants/mystyle'
import { ProductType } from '../../types';
import Grouped from './Grouped';
import Maturity from './Maturity';
import Missing from './Missing';
import Recent from './Recent';
import Colors from '../../constants/Colors'
import {getProducts} from '../../utils/actions';
import Warning from '../Warning';

const Queries = () => {

const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
const [showfiltered, setShowFiltered] = useState<boolean>(true)

useEffect(()=> {
    const ProductRef = getProducts();
    //Getting data from Firebase and saving it in displayList
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
      {displayList ? displayList.length != 0? 
      <View>
        <Missing items={displayList}></Missing>
        <Maturity items={displayList}></Maturity>
        <Recent items={displayList}></Recent>
      </View> 
      : <View style={[mystyle.centered, {marginTop: '30%'}]}>
        <Warning positive={false} mainColor={Colors.light.tint} subColor={Colors.light.gray} 
        iconColor={Colors.light.dsecondary} mainText='Wow, such emptiness.' subText='Please add an item to your ingredients.'></Warning>
        </View> 
      : <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />}
      </View>}
</ScrollView>
)}

export default Queries;