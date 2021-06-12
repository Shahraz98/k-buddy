import React from 'react';
import {View} from 'react-native';
import { List } from 'react-native-paper';
import mystyle from '../../../constants/mystyle';
import {myFormElementProps} from '../../../types';


const OptionList = ({handleUpdate, titleArr, arrIndex, groupArr}:myFormElementProps) => {
    
    return (
        <List.Section 
        style={[mystyle.centered,{ width: '80%', borderRadius: 15, backgroundColor: 'white'}]}>
        <List.Accordion
        style={{backgroundColor: 'white'}}
        titleStyle={[mystyle.secondaryBlack]}
        title={titleArr[arrIndex] === ''? 'Please select an option' : titleArr[arrIndex]}>
          {groupArr? groupArr.map((c) =>
          <List.Item style={{paddingVertical: 2}} 
          titleStyle={[mystyle.centered, mystyle.xsText, mystyle.coloredText]} 
          key={c} onPress={() => handleUpdate(c, arrIndex)} title={c} />) : <View></View>}
        </List.Accordion>
        </List.Section>
    )
}

export default OptionList;