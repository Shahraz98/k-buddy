import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import firebase from '../../utils/firebase.js';
import styles from './styles';
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
<ScrollView style={styles.container}>
<View style={{display: 'flex', flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto'}}>
<Button color={filterColor} title="Filtered Views" onPress={activeFiltered}></Button>
<Button color={addColor} title="Additional Info" onPress={activeAdditional}></Button>
</View>
{showfiltered?
 displayList? <Grouped items={displayList}></Grouped> : <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>Loading</Text>
: <View>
{ displayList? <Maturity items={displayList}></Maturity> : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>} 
<View>
{ displayList? <Missing items={displayList}></Missing> : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>} 
</View>
<View>
{ displayList? <Recent items={displayList}></Recent> : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>} 
</View>
</View>}
</ScrollView>
)}

export default Queries;