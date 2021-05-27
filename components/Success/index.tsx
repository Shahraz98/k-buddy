import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';


export type SuccessProps = {
addAnother: any,
}

const Success = ({addAnother}: SuccessProps) => {

return (
    <View style={{marginLeft:'auto', marginRight: 'auto'}}>
    <Text style={styles.headerText}>Item has been successfully added.</Text>
    <Text>Go to the next tab to view it,</Text>
    <Text>or</Text>
    <TouchableOpacity style={styles.anotherbutton} onPress={addAnother}>
    <Text style={styles.buttonText}>Add another</Text>
    </TouchableOpacity>
    </View>
)}

export default Success;