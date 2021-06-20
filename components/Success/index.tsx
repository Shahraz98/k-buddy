import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SuccessProps} from '../../types';
import mystyle from '../../constants/mystyle';
import Colors from '../../constants/Colors';
import Warning from '../Warning';
import MyButton from '../Button';

const Success = ({addAnother, mainText, subText, buttonText}: SuccessProps) => {

return (
    <View style={[mystyle.centered, {marginTop: '50%'}]}>
        <Warning mainText={mainText} subText={subText} mainColor={Colors.light.gray} 
        subColor={Colors.light.tint} positive={true} iconColor={Colors.light.tint}></Warning>
        {buttonText? 
          <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={addAnother}>
            <MyButton btnText={buttonText} btnColor='dark'></MyButton>
           </TouchableOpacity> : <View></View>}
    </View>
)}

export default Success;