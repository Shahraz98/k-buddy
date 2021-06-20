import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { NavProps} from '../../types';
import Colors from '../../constants/Colors'
import mystyle from '../../constants/mystyle'


const Nav = ({OpenOption1, text1, text2}: NavProps) => {
    const [showOption1, setShowOption1] = useState<boolean>(false)
    const handleSwitch = () => {
        OpenOption1();
        setShowOption1(!showOption1);
    }

return (
    <>
    <View style={[mystyle.centered, mystyle.myNav, mystyle.myMainColoredBtn]}>
        <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showOption1? Colors.light.tsecondary : Colors.light.tint}]} onPress={handleSwitch}>
            <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.whiteText, {paddingHorizontal: 10}]}>{text1}</Text>
        </TouchableOpacity>
        <View style={{height: 50,width: 10,backgroundColor: Colors.light.tint}}></View>
        <TouchableOpacity style={[mystyle.myNavBtn,{backgroundColor: showOption1? Colors.light.tint : Colors.light.tsecondary}]} onPress={handleSwitch}>
            <Text style={[mystyle.myHeaderText, mystyle.smText, mystyle.whiteText, {paddingHorizontal: 10}]}>{text2}</Text>
        </TouchableOpacity>
    </View>
    </>)
}

export default Nav;