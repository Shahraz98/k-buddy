import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SuccessProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {Feather} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const Success = ({addAnother}: SuccessProps) => {

return (
    <View style={{marginTop: '50%'}}>
        <Feather style={mystyle.centered} name="check-circle" size={30} color={Colors.light.tint} />
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Item has been successfully added.</Text>
        <Text style={mystyle.centered}>Go to the next tab to view it, or</Text>
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={addAnother}>
            <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Add another</Text>
        </TouchableOpacity>
    </View>
)}

export default Success;