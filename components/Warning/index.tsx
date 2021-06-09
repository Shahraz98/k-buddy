import React from 'react';
import {Text} from 'react-native';
import {WarningProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {Feather} from '@expo/vector-icons';

const Warning = ({mainText, subText, mainColor, subColor, iconColor, positive}: WarningProps) => {

return (
    <>
        {positive? <><Feather style={mystyle.centered} name='check-circle' size={30} color={iconColor} />
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.stnText, {color: mainColor}]}>{mainText}</Text>
        <Text style={[mystyle.centered, {color: subColor}]}>{subText}</Text></> :
        <><Feather style={mystyle.centered} name='frown' size={30} color={iconColor} />
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.stnText, {color: mainColor}]}>{mainText}</Text>
        <Text style={[mystyle.centered, {color: subColor}]}>{subText}</Text></>}
    </>
)}

export default Warning;