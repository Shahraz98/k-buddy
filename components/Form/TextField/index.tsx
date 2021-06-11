import React from 'react';
import {TextInput} from 'react-native';
import mystyle from '../../../constants/mystyle';
import {myFormElementProps} from '../../../types';


const TextField = ({handleUpdate, titleArr, arrIndex, placeHold}:myFormElementProps) => {
    
    return (
        <TextInput value={titleArr[arrIndex]} onChangeText={(e) => handleUpdate(e, arrIndex)} numberOfLines={3}
        multiline={true} style={[mystyle.myMainInput, mystyle.myMainBlackBtn,mystyle.centered, mystyle.smText, mystyle.whiteText]}
        placeholder={placeHold} placeholderTextColor="lightgray"></TextInput>
    )
}

export default TextField;