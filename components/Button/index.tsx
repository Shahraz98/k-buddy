import React, {useEffect, useRef} from 'react';
import {Text, View, Animated, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNow} from 'date-fns';
import { AntDesign} from '@expo/vector-icons'; 
import mystyle from '../../constants/mystyle';
import {ButtonProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';



const MyButton = ({btnText, btnColor}: ButtonProps) => {
    
    
return (
    <View>
        {btnColor === 'light'? 
        <Text style={[mystyle.myformBtnText, mystyle.coloredText, mystyle.centered, mystyle.xsText]}>{btnText}</Text>
        : <View></View>}
        {btnColor === 'tint'? 
          <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
            <Text style={[mystyle.myformBtnText, mystyle.whiteText, mystyle.centered, mystyle.xsText]}>{btnText}</Text>
          </LinearGradient> : <View></View>}
        {btnColor === 'dark'? 
       <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
       <Text style={[mystyle.myformBtnText, mystyle.whiteText, mystyle.centered, mystyle.xsText]} >{btnText}</Text>
       </LinearGradient> : <View></View>}
    </View>)
}

export default MyButton;