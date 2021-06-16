import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ProductProps} from '../../../../types';
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../../constants/Colors';
import {unFreeze, handleFreeze, handleDelete} from '../../../../utils/actions';
import MyButton from '../../../Button';

const RowMid = ({item}: ProductProps) => {

return (
<View style={[mystyle.myClmContainer, {marginTop: 'auto', marginBottom:'auto'}]}>
    <TouchableOpacity style={[mystyle.myMainBtn]}  onPress={() => handleDelete(item)}>
        <MyButton btnColor='dark' btnText='Delete' ></MyButton>
    </TouchableOpacity>
    {item.maturity?
    <View>
        {item.confection === 'Frozen'? 
        <TouchableOpacity style={[mystyle.myMainBtn]} onPress={() => unFreeze(item)}>
         <MyButton btnColor='tint' btnText='Unfreeze' ></MyButton>
        </TouchableOpacity>
        : <TouchableOpacity style={[mystyle.myMainBtn]}  onPress={() => handleFreeze(item)}>
            <MyButton btnColor='tint' btnText='Freeze' ></MyButton>
          </TouchableOpacity>}
    </View>: <View></View>}
</View>
)}

export default RowMid;