import React, {useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator, ImageBackground, TouchableOpacity, Text} from 'react-native';
import firebase from '../../utils/firebase';
import { ProductType } from '../../types';
import ExpiringSoon from './ExpiringSoon';
import DefaultList from './DefaultList';
import Colors from '../../constants/Colors'
import mystyle from '../../constants/mystyle'

const Feed = () => {
    const [showExpiring, setShowExpiring] = useState<boolean>(false)
    const [fullList, setfullList] = useState<ProductType[] | undefined>(undefined);

    useEffect(()=> {
    const ProductRef = firebase.database().ref("Product"); //Get products from Firebase

    ProductRef.on("value", (snapshot) => {
        const elements = snapshot.val();
        const productList:Array<ProductType> = [];
        for (let id in elements){
            productList.push({id, ...elements[id]});
        }
        setfullList(productList);
    })
    }, []);

return (
<ScrollView style={mystyle.myFeedContainer}>
<View style={[mystyle.centered, mystyle.myNav]}>
    <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showExpiring? 'white' : Colors.light.background}]} onPress={() => setShowExpiring(false)}>
        <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.blackText, {paddingHorizontal: 10}]}>My Ingredients</Text>
        </TouchableOpacity>
        <View style={{height: 50,width: 10,backgroundColor: 'white'}}></View>
        <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showExpiring? Colors.light.background : 'white'}]} onPress={() => setShowExpiring(true)}>
        <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.blackText, {paddingHorizontal: 10}]}>Expiring Soon</Text>
        </TouchableOpacity>
    </View>
    {showExpiring?
      <View>{fullList? <ExpiringSoon items={fullList}></ExpiringSoon> : <View></View>}</View>
    : <View>{fullList? <DefaultList items={fullList}></DefaultList> : <ActivityIndicator style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.dsecondary} />}</View>
    }
</ScrollView>
)}

export default Feed;