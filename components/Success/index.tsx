import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SuccessProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {Feather} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import Warning from '../Warning';

const Success = ({addAnother, mainText, subText, buttonText}: SuccessProps) => {

return (
    <View style={[mystyle.centered, {marginTop: '50%'}]}>
        <Warning 
        mainText={mainText} 
        subText={subText} 
        mainColor={Colors.light.gray} 
        subColor={Colors.light.tint} 
        positive={true}
        iconColor={Colors.light.tint}></Warning>
        {buttonText? 
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={addAnother}>
        <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>{buttonText}</Text>
        </LinearGradient>
        </TouchableOpacity> : <View></View>}
    </View>
)}

export default Success;