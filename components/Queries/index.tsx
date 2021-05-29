import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View, Button} from 'react-native';
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
const [filterColor, setfilterColor] = useState<string>('#FF5733')
const [addColor, setaddColor] = useState<string>('#30303b')

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

const activeFiltered = () => {
    setShowFiltered(true);
    setfilterColor(Colors.light.tint);
    setaddColor(Colors.light.gray);
}

const activeAdditional = () => {
    setShowFiltered(false);
    setfilterColor(Colors.light.gray);
    setaddColor(Colors.light.tint);
}

return (
<ScrollView style={mystyle.myFeedContainer}>
    <View style={[mystyle.centered, {flexDirection: 'row'}]}>
    <Button color={filterColor} title="Filtered Views" onPress={activeFiltered}></Button>
    <Button color={addColor} title="Additional Info" onPress={activeAdditional}></Button>
    </View>
    
    {showfiltered?
    displayList? <Grouped items={displayList}></Grouped> 
    : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />
    : <View>
        { displayList? <Maturity items={displayList}></Maturity> : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />} 
      <View>
        { displayList? <Missing items={displayList}></Missing> : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />} 
      </View>
      <View>
        { displayList? <Recent items={displayList}></Recent> : <ActivityIndicator  style={{marginHorizontal: 25}} size="large" color={Colors.light.tint} />} 
      </View>
      </View>}
</ScrollView>
)}

export default Queries;