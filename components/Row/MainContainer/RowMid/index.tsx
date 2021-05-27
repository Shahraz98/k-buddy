import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { RowProps} from '../../../../types';
import styles from '../styles';
import firebase from '../../../../utils/firebase'
import { sub,format, add} from 'date-fns'

const RowMid = ({product}: RowProps) => {

    const ProductRef = firebase.database().ref("Product").child(product.id);

    const handleFreeze = async () => {
        try {
        const temp = add(new Date(product.expiry!), {
            months: 6,
          })
        const extended = format(temp, "yyyy-MM-dd'T'HH:mm")
        await ProductRef.update({
         expiry: extended,
         confection: 'Frozen'
        })
     } catch(error) {console.log('error',error)}
    }

    const handleDelete = async () => {
        try {await ProductRef.remove();}
        catch(error) {console.log('error',error)}
     }
    
    const unFreeze = async () => {
      try {
      const temp = sub(new Date(product.expiry!), {
            months: 6,
       })
       const unfrozen = format(temp, "yyyy-MM-dd'T'HH:mm")
       await ProductRef.update({
        expiry: unfrozen,
        confection: 'Fresh'
       }) 
       }
       catch(error) {console.log('error',error)}
    }

return (
<>
<View style={[styles.columnContainer, {marginTop: 'auto', marginBottom:'auto'}]}>
        <TouchableOpacity style={styles.dltbtn} onPress={handleDelete}>
            <Text style={styles.editText} >Delete</Text>
        </TouchableOpacity>
        {product.maturity?
        <View>{product.confection === 'Frozen'? 
            <TouchableOpacity style={styles.frzbtn} onPress={unFreeze}>
            <Text style={styles.editText}>Unfreeze</Text>
             </TouchableOpacity>
        :  <TouchableOpacity style={styles.frzbtn} onPress={handleFreeze}>
           <Text style={[styles.editText, {color: '#30303b'}]}>Freeze</Text>
            </TouchableOpacity>
        }
        </View>
        : <View></View>
        }
    </View>
</>
)}

export default RowMid;