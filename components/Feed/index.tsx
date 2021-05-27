import React, {useEffect, useState} from 'react';
import {ScrollView, View, Button, ActivityIndicator} from 'react-native';
import styles from './styles';
import firebase from '../../utils/firebase.js';
import { ProductType } from '../../types';
import ExpiringSoon from './ExpiringSoon';
import DefaultList from './DefaultList';
import Colors from '../../constants/Colors'

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
<ScrollView style={styles.container}>
<View style={{display: 'flex', flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto'}}>
<Button color={listColor} title="Ingredients List" onPress={activeList}></Button>
<Button color={expColor} title="Expiring soon" onPress={activeExpiring}></Button>
</View>
    {showExpiring?
      <View>{fullList? <ExpiringSoon items={fullList}></ExpiringSoon> : <ActivityIndicator size="large" color="#00FA9A" />}</View>
    : <View>{fullList? <DefaultList items={fullList}></DefaultList> : <ActivityIndicator size="large" color="#00FA9A" />}</View>
   }
</ScrollView>
)}

export default Feed;