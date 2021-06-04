import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SuccessProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {Feather} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';

const Success = ({addAnother, mainText, subText, buttonText}: SuccessProps) => {

return (
    <View style={[mystyle.centered, {marginTop: '50%'}]}>
        <Feather style={mystyle.centered} name="check-circle" size={30} color={Colors.light.tint} />
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>{mainText}</Text>
        <Text style={[mystyle.centered, mystyle.coloredText]}>{subText}</Text>
        {buttonText? 
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={addAnother}>
        <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>{buttonText}</Text>
        </LinearGradient>
        </TouchableOpacity> : <View></View>}
    </View>
)}

export default Success;