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
    const [listColor, setlistColor] = useState<string>(Colors.light.tint)
    const [expColor, setexpColor] = useState<string>(Colors.light.gray)
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

    const activeExpiring = () => {
      setShowExpiring(true);
      setexpColor(Colors.light.background);
      setlistColor(Colors.light.gray);
  }
  
  const activeList = () => {
      setShowExpiring(false);
      setexpColor(Colors.light.gray);
      setlistColor(Colors.light.background);
  }

return (
<ScrollView style={mystyle.myFeedContainer}>
    <View style={[mystyle.centered, {flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}]}>
        <TouchableOpacity onPress={activeList}>
        <Text style={[mystyle.myHeaderText, mystyle.stnText,{color: listColor, paddingHorizontal: 10}]}>My Ingredients </Text>
        </TouchableOpacity>
        <View style={{height: 50,width: 1,backgroundColor: Colors.light.background}}></View>
        <TouchableOpacity onPress={activeExpiring}>
        <Text style={[mystyle.myHeaderText, mystyle.stnText, {color: expColor, paddingHorizontal: 10}]}> Expiring Soon</Text>
        </TouchableOpacity>
    </View>
    {showExpiring?
      <View>{fullList? <ExpiringSoon items={fullList}></ExpiringSoon> : <View></View>}</View>
    : <View>{fullList? <DefaultList items={fullList}></DefaultList> : <ActivityIndicator style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />}</View>
    }
</ScrollView>
)}

export default Feed;