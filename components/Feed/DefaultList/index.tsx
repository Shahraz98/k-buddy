import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ProductType, DefListProps} from '../../../types';
import Colors from '../../../constants/Colors';
import mystyle from '../../../constants/mystyle';
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
      value={search} inputContainerStyle={{backgroundColor: Colors.light.gray}} color={Colors.light.background}
      containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}>
    </SearchBar>
   
    {showFull?
      <View>
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Recently bought</Text>
        <RecentlyBought items={items}/>
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Active Ingredients</Text>
        <Displayer items={items} colored={true} text='No Ingredients found.'></Displayer>
      </View>
      :  <View>
          {displayList?
          <View>
          <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Recently bought</Text>
          <RecentlyBought items={items}/>
          <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>Active Ingredients</Text>
          <Displayer items={items} colored={true} text='No Ingredients found.'></Displayer></View>
          : <View></View>}
         </View>
    }
</View>
</>
)}

export default DefaultList;