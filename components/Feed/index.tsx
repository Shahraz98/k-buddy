import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View} from 'react-native';
import { SearchBar } from 'react-native-elements';
import moment from 'moment';
import styles from './styles';
import Row from '../Row';
import firebase from '../../utils/firebase.js';
import { ProductType } from '../../types';

const Feed = () => {

    const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
    const [fullList, setfullList] = useState<ProductType[] | undefined>(undefined);
    const [showFull, setshowFull] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

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

    const searchFilterFunction = (text:string) => {
        // Check if searched text is not blank
        if (text) {
          if(fullList){
            const newData:ProductType[] = fullList.filter(function (item) {
              const itemData:string = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
              const textData:string = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setshowFull(false);
            setdisplayList(newData);
            setSearch(text);
          }
        } else {
          setshowFull(true);
          setSearch(text);
        }
      };

    const words = ['day', 'hour'] //Used to filter moment dates and determine items soon expiring

return (
<ScrollView style={styles.container}>

    <Text style={styles.headerText}>Your Ingredients</Text>
        <SearchBar 
          round
          searchIcon={{ size: 24 }}
          placeholder="Type Here..."
          onChangeText={(text:string) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          value={search}
          containerStyle={{backgroundColor: 'white', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
          color='white'>
        </SearchBar>

        {showFull?
          <View>
           {fullList ?
           fullList.map((product, i) => <Row key={i} item={product}/> ) 
           : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
           }
          </View>
          :  <View>
          {displayList ?
          displayList.map((product, i) => <Row key={i} item={product}/> ) 
          : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
          }
         </View>
        }

   {/*Expiring BEFORE next month, items expiring exactly in 1 month are ignored.*/}

   <Text style={styles.headerText}>Expiring before a month</Text>
   {   fullList ?
    fullList.filter((product) => moment(product.expiry).fromNow().indexOf(words[0]) > -1 
    || moment(product.expiry).fromNow().indexOf(words[1]) > -1).map((product, i) => <Row key={i} item={product}/>) 
    : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
    }

</ScrollView>
)}

export default Feed;