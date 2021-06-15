import React, {useState} from 'react';
import { DefListProps} from '../../../types';
import {View, Text, TouchableOpacity} from 'react-native';
import SingleGroup from './SingleGroup';
import {AntDesign, Ionicons, Feather, SimpleLineIcons} from '@expo/vector-icons'; 
import mystyle from '../../../constants/mystyle';
import Colors from '../../../constants/Colors';
import Warning from '../../Warning';

const Grouped = ({items}: DefListProps) => {
    const [myVar, setMyVar] = useState<number>(0); //Used to switch between views

return (
<View style={{marginTop: 20}}>
{items.length != 0?
<View>{myVar === 0? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <AntDesign name="right" style={{marginRight: 50}} size={21} color='transparent' />
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Category</Text>
            <Ionicons name="md-fast-food-outline" style={[mystyle.centered, {marginTop: 5}]} size={26} color={Colors.light.dsecondary} />
        </View>
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="right" style={{marginLeft: 50, marginTop: 4}} size={21} color={Colors.light.tint}/>
        </TouchableOpacity>
    </View>
    <SingleGroup items={items} filterby="Category" groupIcon="fastfood"/></View> : <View></View>}
{myVar === 1? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(0)}>
            <AntDesign name="left" style={{marginRight: 50, marginTop: 4}} size={21} color={Colors.light.tint}/>
        </TouchableOpacity>
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Location</Text>
            <Feather name="shopping-bag" style={[mystyle.centered, {marginTop: 5}]} size={24} color={Colors.light.dsecondary} />
        </View>
        <TouchableOpacity onPress={() => setMyVar(2)}>
            <AntDesign name="right" style={{marginLeft: 50, marginTop: 4}} size={21} color={Colors.light.tint}/>
        </TouchableOpacity>
        </View>
        <SingleGroup items={items} filterby="Location" groupIcon="kitchen"/></View> : <View></View>}
{myVar === 2? <View style={{flexDirection: 'column'}}>
    <View style={[mystyle.myRowHeader, mystyle.centered]}>
        <TouchableOpacity onPress={() => setMyVar(1)}>
            <AntDesign name="left" style={{marginRight: 50, marginTop: 4}} size={21} color={Colors.light.tint}/>
        </TouchableOpacity>
        <View style={mystyle.myClmContainer}>
            <Text style={[mystyle.bigText,mystyle.centered]}>View</Text>
            <Text style={mystyle.smText}>by Confection</Text>
            <SimpleLineIcons name="bag" style={[mystyle.centered, {marginTop: 5}]} size={24} color={Colors.light.dsecondary} />
        </View>
        <AntDesign name="right" style={{marginLeft: 50, marginTop: 4}} size={21} color="transparent" />
    </View>
    <SingleGroup items={items} filterby="Confection" groupIcon="shopping-basket"/></View> : <View></View>}</View> 
    : <View style={[mystyle.centered, {marginTop: '30%'}]}><Warning 
    positive={false} 
    mainColor={Colors.light.tint} 
    subColor={Colors.light.gray} 
    iconColor={Colors.light.dsecondary} 
    mainText='Nothing to see here.' 
    subText='Please add an item to your ingredients.'></Warning></View> }
</View>
)}

export default Grouped;