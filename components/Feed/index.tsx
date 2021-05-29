import React, {useEffect, useState} from 'react';
import {ScrollView, View, Button, ActivityIndicator} from 'react-native';
import firebase from '../../utils/firebase';
import { ProductType } from '../../types';
import ExpiringSoon from './ExpiringSoon';
import DefaultList from './DefaultList';
import Colors from '../../constants/Colors'
import mystyle from '../../constants/mystyle'

const Feed = () => {
    const [showExpiring, setShowExpiring] = useState<boolean>(false)
    const [listColor, setlistColor] = useState<string>('#FF5733')
    const [expColor, setexpColor] = useState<string>('#30303b')
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
      setexpColor(Colors.light.tint);
      setlistColor(Colors.light.gray);
  }
  
  const activeList = () => {
      setShowExpiring(false);
      setexpColor(Colors.light.gray);
      setlistColor(Colors.light.tint);
  }

return (
<ScrollView style={mystyle.myFeedContainer}>
    <View style={[mystyle.centered, {flexDirection: 'row'}]}>
        <Button color={listColor} title="Ingredients List" onPress={activeList}></Button>
        <Button color={expColor} title="Expiring soon" onPress={activeExpiring}></Button>
    </View>
    {showExpiring?
      <View>{fullList? <ExpiringSoon items={fullList}></ExpiringSoon> : <View></View>}</View>
    : <View>{fullList? <DefaultList items={fullList}></DefaultList> : <ActivityIndicator style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />}</View>
    }
</ScrollView>
)}

export default Feed;