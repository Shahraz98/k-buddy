import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ProductProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../../constants/Colors';
import {unFreeze, handleFreeze, handleDelete} from '../../../../utils/actions';

const RowMid = ({item}: ProductProps) => {

return (
<View style={[mystyle.myClmContainer, {marginTop: 'auto', marginBottom:'auto'}]}>
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn]}  onPress={() => handleDelete(item)}>
    <LinearGradient
              colors={[Colors.light.gray, Colors.light.dsecondary]}
              start={[0.2, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]} >Delete</Text>
        </LinearGradient>
    </TouchableOpacity>
    
    {item.maturity?
    <View>
    {item.confection === 'Frozen'? 
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn]} onPress={() => unFreeze(item)}>
        <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.3, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Unfreeze</Text>
        </LinearGradient>
    </TouchableOpacity>
    : <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn]}  onPress={() => handleFreeze(item)}>
        <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.2, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Freeze</Text>
        </LinearGradient>
      </TouchableOpacity>
    }
    </View>
    : <View></View>}
</View>
)}

export default RowMid;