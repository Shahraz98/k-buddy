import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import mystyle from '../../../constants/mystyle';
import {myFormElementProps} from '../../../types';
import Colors from '../../../constants/Colors';


const DotList = ({handleUpdate, titleArr ,arrIndex, groupArr, placeHold}:myFormElementProps) => {
    const [check, setCheck] = useState<string>(titleArr[arrIndex]);
    const handleDot = (element:string) => {
    setCheck(element);
    handleUpdate(element, arrIndex)
    }
    
    return (
    <>
      <Text style={[mystyle.centered, mystyle.smText, {marginTop: 20}]}>Select {placeHold}</Text>
      {groupArr?
        <View style={[mystyle.centered, {marginVertical: 10, flexDirection: 'row', flexWrap: 'wrap'}]}>
          {
               groupArr.map((element) => 
               <View key={element} style={mystyle.myDotContainer}>
                   <TouchableOpacity onPress={() => handleDot(element)}>
                       <View style={[mystyle.centered, mystyle.myDot,{backgroundColor: element === check? Colors.light.tint : 'white'}]}></View>
                       <Text style={[mystyle.xsText, mystyle.centered, {marginTop: 5}]}>{element}</Text>
                    </TouchableOpacity>
               </View>)
          }
        </View> : <View></View>}
    </>
    )
}

export default DotList;