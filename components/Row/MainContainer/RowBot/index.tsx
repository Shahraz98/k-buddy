import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import { RowProps} from '../../../../types';
import styles from '../styles';
import firebase from 'firebase';
import { format, formatDistanceToNow, add} from 'date-fns'
import { FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

const RowBot = ({product}: RowProps) => {
const [isEnabled, setIsEnabled] = useState(product.isOpen);

const ProductRef = firebase.database().ref("Product").child(product.id);

const handleOpen =  () => {
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
<>
    <View style={styles.columnContainer}>
        {product.isOpen?  <View style={{marginRight: 'auto', marginLeft: 'auto', marginBottom: 5, marginTop: 10}}>
        <Text style={{color: '#00FA9A', fontSize: 11, marginLeft: 'auto', marginRight: 'auto'}}>Opened</Text>
    <FontAwesome name="dropbox" size={65} color="white" />
        </View>
        :  <View style={{marginRight: 'auto', marginLeft: 'auto', marginBottom: 5, marginTop: 10}}>
        <Text style={{color: '#00FA9A', fontSize: 11, marginLeft: 'auto', marginRight: 'auto'}}>Closed</Text>
        <MaterialCommunityIcons name="cube" size={50} color="#00FA9A" />
            </View>}
            <Switch
            style={{marginLeft: 'auto', marginRight: 'auto'}}
        trackColor={{ true: "white", false: "#00FA9A" }}
        thumbColor={"#30303b"}
        ios_backgroundColor="white"
        onValueChange={handleOpen}
        disabled={isEnabled}
        value={isEnabled}
      />
    </View>
</>
)}

export default RowBot;