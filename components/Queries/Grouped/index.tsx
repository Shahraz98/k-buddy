import React, {useState} from 'react';
import { DefListProps} from '../../../types';
import SingleGroup from './SingleGroup';
import { View ,Text} from '../../Themed';
import {AntDesign} from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import mystyle from '../../../constants/mystyle'
import Colors from '../../../constants/Colors'

const Grouped = ({items}: DefListProps) => {
    const [myVar, setMyVar] = useState<number>(0); //Used to switch between views

return (
<View style={{marginTop: 20}}>
{myVar === 0? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <AntDesign name="arrowright" style={{marginRight: 50}} size={24} color='transparent' />
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Category</Text>
        </View>
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="arrowright" style={{marginLeft: 50}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
    </View>
    <SingleGroup items={items} filterby="Category" groupIcon="fastfood"/></View> : <View></View>}
{myVar === 1? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(0)}>
            <AntDesign name="arrowleft" style={{marginRight: 50}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Location</Text>
        </View>
        <TouchableOpacity onPress={() => setMyVar(2)}>
            <AntDesign name="arrowright" style={{marginLeft: 50}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
        </View>
        <SingleGroup items={items} filterby="Location" groupIcon="kitchen"/></View> : <View></View>}
{myVar === 2? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="arrowleft" style={{marginRight: 50}} size={24} color={Colors.light.dsecondary}/>
        </TouchableOpacity>
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Confection</Text>
        </View>
        <AntDesign name="arrowright" style={{marginLeft: 50}} size={24} color="transparent" />
    </View>
    <SingleGroup items={items} filterby="Confection" groupIcon="shopping-basket"/></View> : <View></View>}
</View>
)}

export default Grouped;