import React from 'react';
import {View} from 'react-native';
import { List } from 'react-native-paper';
import mystyle from '../../../constants/mystyle';
import Colors from '../../../constants/Colors'
import {myFormElementProps} from '../../../types';


const OptionList = ({handleUpdate, titleArr, arrIndex, groupArr}:myFormElementProps) => {
    
    return (
        <List.Section 
        style={[mystyle.centered, mystyle.myMainWhiteBtn,{ width: '80%', borderRadius: 15}]}>
        <List.Accordion
        titleStyle={[mystyle.blackText]}
        title={titleArr[arrIndex] === ''? 'Please select an option' : titleArr[arrIndex]}>
          {groupArr? groupArr.map((c) =>
          <List.Item style={{paddingVertical: 2}} 
          titleStyle={[mystyle.centered, mystyle.xsText, mystyle.blackText,]} 
          key={c} onPress={() => handleUpdate(c, arrIndex)} title={c} />) : <View></View>}
        </List.Accordion>
        </List.Section>
    )
}

export default OptionList;