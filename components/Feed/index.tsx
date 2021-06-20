import React, {useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import { ProductType } from '../../types';
import ExpiringSoon from './ExpiringSoon';
import DefaultList from './DefaultList';
import Colors from '../../constants/Colors'
import mystyle from '../../constants/mystyle'
import {getProducts} from '../../utils/actions';
import Warning from '../Warning';
import { isAfter } from 'date-fns';
import Nav from '../Nav';

const Feed = () => {
    const [showExpiring, setShowExpiring] = useState<boolean>(false)
    const [fullList, setfullList] = useState<ProductType[] | undefined>(undefined);
    const availableList = fullList? fullList.filter((product) => isAfter(new Date(), new Date(product.expiry)) === false) : []
    const handleOptions = () => {
        setShowExpiring(!showExpiring);
    }
  
    useEffect(()=> {
        const ProductRef = getProducts();
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
    <Nav OpenOption1={handleOptions} text1="My Ingredients" text2="Expiring Soon"></Nav>
    {showExpiring?
       <View>
      {fullList? fullList.length != 0? <ExpiringSoon items={fullList}></ExpiringSoon> 
      : <View style={[mystyle.centered, {marginTop: '30%'}]}>
          <Warning positive={false} mainColor={Colors.light.background} subColor={Colors.light.gray} 
          iconColor={Colors.light.gray} mainText='Your list seems a little empty.' subText='Please add an item to your ingredients.'></Warning>
        </View> : <View></View>}
        </View> : <View>
        {fullList? availableList.length != 0? <DefaultList items={availableList}></DefaultList> 
        : <View style={[mystyle.centered, {marginTop: '30%'}]}>
            <Warning positive={false} mainColor={Colors.light.tint} subColor={Colors.light.gray} 
            iconColor={Colors.light.gray} mainText='This page seems a little empty.' subText='No ingredient is currently available.'></Warning>
          </View> : <ActivityIndicator style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />}
      </View>
    }
</ScrollView>)
}

export default Feed;
