import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ProductType, DefListProps} from '../../../types';
import Colors from '../../../constants/Colors';
import mystyle from '../../../constants/mystyle';
import ArrowNav from '../../ArrowNav';
import Displayer from '../../Displayer';
import RecentlyBought from './RecentlyBought';

const DefaultList = ({items}: DefListProps) => {
  const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
  const [showFull, setshowFull] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  
  const searchFilterFunction = (text:string) => {
        // Check if searched text is not blank and manage the displayed list based on input
        if (text) {
          if(items){
            const newData:ProductType[] = items.filter(function (item) {
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

return (
<>
<View>
    <SearchBar round searchIcon={{ size: 24 }} placeholder="Search Ingredient"
      onChangeText={(text:string) => searchFilterFunction(text)} onClear={() => searchFilterFunction('')}
      value={search} inputContainerStyle={{backgroundColor: '#f5f5f5'}} color={Colors.light.gray}
      containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}>
    </SearchBar>
   
    {showFull?
      <View>
      <ArrowNav comp1={<Displayer items={items} text='No Ingredients found.'></Displayer>} 
      comp2={<RecentlyBought items={items}/>} text1='Your Ingredients' text2='Recently bought'></ArrowNav>
      </View>
      :  <View>
          {displayList?
          <View>
          <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Your Ingredients</Text>
          <Displayer items={items} text='No Ingredients found.'></Displayer>
          <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Recently bought</Text>
          <RecentlyBought items={items}/></View>
          : <View></View>}
         </View>
    }
</View>
</>
)}

export default DefaultList;