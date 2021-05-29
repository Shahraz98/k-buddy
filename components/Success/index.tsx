import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SuccessProps} from '../../types';
import mystyle from '../../constants/mystyle';

const Success = ({addAnother}: SuccessProps) => {

return (
    <View style={{marginLeft: 25, marginTop: '50%'}}>
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Item has been successfully added.</Text>
        <Text>Go to the next tab to view it,</Text>
        <Text>or</Text>
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={addAnother}>
            <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Add another</Text>
        </TouchableOpacity>
    </View>
)}

export default Success;