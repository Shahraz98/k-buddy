import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import { RowProps} from '../../../../types';
import firebase from '../../../../utils/firebase';
import { format, formatDistanceToNow, add} from 'date-fns'
import { FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import mystyle from '../../../../constants/mystyle';

const RowBot = ({product}: RowProps) => {
const [isEnabled, setIsEnabled] = useState(product.isOpen);
const ProductRef = firebase.database().ref("Product").child(product.id);

const handleOpen =  () => {
    //Pretty much same logic as the unFreeze method in the RowMid component, only difference is in setting the isOpen property to true
    try {
        if(formatDistanceToNow(new Date(product.expiry!)).includes('year')
        || formatDistanceToNow(new Date(product.expiry!)).includes('month')
        || formatDistanceToNow(new Date(product.expiry!)).includes('days')){
            const temp = add(new Date(), {
                days: 1,
            })
            const minEx = format(temp, "yyyy-MM-dd'T'HH:mm")
             ProductRef.update({
             expiry: minEx,
             isOpen: true,
            })
            setIsEnabled(true);
        } else {
             ProductRef.update({
             isOpen: true,
            })
            setIsEnabled(true);
        }
 } catch(error) {console.log('error',error)}
}

return (
<View style={mystyle.myClmContainer}>
    {product.isOpen? 
    <View style={[mystyle.centered, {marginBottom: 5}]}>
        <FontAwesome name="dropbox" size={65} color={Colors.light.gray} />
    </View>
    : <View style={[mystyle.centered, {marginBottom: 5}]}>
        <MaterialCommunityIcons name="cube" size={50} color={Colors.light.gray} />
      </View>}
      <Switch
      style={[mystyle.centered, {marginBottom: 10}]}
      trackColor={{ true: Colors.light.tint, false: Colors.light.tint }}
      thumbColor={'#FF7F50'}
      ios_backgroundColor="white"
      onValueChange={handleOpen}
      disabled={isEnabled}
      value={isEnabled}/>
</View>
)}

export default RowBot;