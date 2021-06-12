import React, {useState}from 'react';
import {Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { ArrowNavProps} from '../../types';
import mystyle from '../../constants/mystyle';

const ArrowNav = ({comp1, comp2, text1, text2, text3, comp3}: ArrowNavProps) => {
const [myVar, setMyVar] = useState<number>(0); //Used to switch between views

return (
<>
<View>
{myVar === 0? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <AntDesign name="arrowright" style={{marginRight: 50, marginTop: 15}} size={24} color='transparent' />
        
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>{text1}</Text>
        
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="arrowright" style={{marginLeft: 50, marginTop: 15}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
    </View>
    {comp1}</View> : <View></View>}
    {myVar === 1? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(0)}>
            <AntDesign name="arrowleft" style={{marginRight: 50, marginTop: 15}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
       
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>{text2}</Text>
        {comp3?
         <TouchableOpacity onPress={() => setMyVar(2)}>
         <AntDesign name="arrowright" style={{marginLeft: 50, marginTop: 15}} size={24} color={Colors.light.dsecondary}/>
     </TouchableOpacity> 
     : <AntDesign name="arrowright" style={{marginLeft: 50, marginTop: 15}} size={24} color="transparent"/>}
        </View>
       {comp2}</View> : <View></View>}
    {myVar === 2? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="arrowleft" style={{marginRight: 50, marginTop: 15}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
       
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.whiteText, mystyle.stnText]}>{text3}</Text>
        <AntDesign name="arrowright" style={{marginLeft: 50, marginTop: 15}} size={24} color="transparent"/>
        </View>
    {comp3}</View> : <View></View>}
</View>
</>
)}

export default ArrowNav;