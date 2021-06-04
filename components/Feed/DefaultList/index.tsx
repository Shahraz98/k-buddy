import React, {useState} from 'react';
import {View} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ProductType, DefListProps} from '../../../types';
import SingleList from './SingleList';

const DefaultList = ({items}: DefListProps) => {
  const [displayList, setdisplayList] = useState<ProductType[] | undefined>(undefined);
  const [showFull, setshowFull] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  
  const searchFilterFunction = (text:string) => {
        // Check if searched text is not blank
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
      value={search} inputContainerStyle={{backgroundColor: '#f5f5f5'}} color='white'
      containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}>
    </SearchBar>

    {showFull?
      <View>
        <SingleList items={items}></SingleList>
      </View>
      :  <View>
          {displayList? <SingleList items={displayList}></SingleList> 
          : <View></View>}
         </View>
    }
</View>
</>
)}

export default DefaultList;