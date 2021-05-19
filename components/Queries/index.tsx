import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View} from 'react-native';
import firebase from '../../utils/firebase.js';
import moment from 'moment';
import styles from './styles';
import Row from '../Row';
import { ProductType } from '../../types';
import Filter from '../Filter';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Queries = () => {

const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
const catlist: string[] = []; //Array of categories
const loclist: string[] = []; //Array of locations
const conlist: string[] = []; //Array of confections
const [showCat, setShowCat] = useState<boolean>(false)
const [showLoc, setShowLoc] = useState<boolean>(false)
const [showCon, setShowCon] = useState<boolean>(false)

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

const words = ['day', 'hour'] //Used to filter recently added items
const ripewords = ['2 days','a day', 'hour'] //Used to filter ripeness status check of items

return (
<ScrollView style={styles.container}>
    <Text style={styles.headerText}>Please check Maturity Status</Text>
    {displayList?
    displayList.filter((product) => moment(product.maturitydate).fromNow().includes(ripewords[0]) === false 
    && moment(product.maturitydate).fromNow().includes(ripewords[1]) === false
    && moment(product.maturitydate).fromNow().includes(ripewords[2]) === false).map((product) => <Row key={product.id} item={product}/>)
    : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
    }

    <Text style={styles.headerText}>Ingredients missing data</Text> 
    <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 10, marginBottom: 10}}>(no items will be shown if every item is complete.)</Text>
    {   displayList ?
    displayList.filter((product) => {
        if(product.category === '' || product.confection === '' || product.expiry === '' || product.location === ''){
            return product; }
    }).map((product) => <Row key={product.id} item={product}/> ) : <Text style={{marginRight: 'auto', marginLeft: 'auto'}}>Loading ..</Text>
    }

    <View style={styles.filterRow}>
        <TouchableOpacity onPress={()=> setShowLoc(!showLoc)}>
            <Text style={styles.filterText}>View by Location</Text>
        </TouchableOpacity>
    </View>
    
    {showLoc?
    <View>
        {displayList?
        displayList.map( (product) =>{ if(loclist.indexOf(product.location!) > -1) {
            return <View key={product.id}></View>
        } else {
            loclist.push(product.location!);
            return <Filter key={product.id} filterby="location" filterto={product.location!}></Filter>}})
        : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
        }
    </View> 
    : <View></View>
    } 

    <View style={styles.filterRow}>
        <TouchableOpacity onPress={()=> setShowCat(!showCat)}>
            <Text style={styles.filterText}>View by Category</Text>
        </TouchableOpacity>
    </View>

    {showCat?
    <View>
        {displayList?
        displayList.map( (product) =>{ if(catlist.indexOf(product.category!) > -1) {
            return <View key={product.id}></View>
        } else {
            catlist.push(product.category!);
            return <Filter key={product.id} filterby="category" filterto={product.category!}></Filter>}})
        : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
        }
    </View> 
    : <View></View>
    } 

    <View style={styles.filterRow}>
        <TouchableOpacity onPress={()=> setShowCon(!showCon)}>
            <Text style={styles.filterText}>View by Confection</Text>
    </TouchableOpacity>
    </View>
    {showCon?
    <View>
        {displayList?
        displayList.map( (product) =>{ if(conlist.indexOf(product.confection!) > -1) {
            return <View key={product.id}></View>
        } else {
            conlist.push(product.confection!);
            return <Filter key={product.id} filterby="confection" filterto={product.confection!}></Filter>}})
            : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
        }
    </View> 
    : <View></View>
    }

<Text style={styles.headerText}>Added during last month</Text>
{   displayList?
    displayList.filter((product) => moment(product.addedOn).fromNow().indexOf(words[0]) > -1 
    || moment(product.addedOn).fromNow().indexOf(words[1]) > -1).map((product) => <Row key={product.id} item={product}/>)
    : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
}

</ScrollView>
)}

export default Queries;