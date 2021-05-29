import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { RowProps} from '../../../../types';
import firebase from '../../../../utils/firebase'
import { sub,format, add} from 'date-fns'
import mystyle from '../../../../constants/mystyle'

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
<View style={[mystyle.myClmContainer, {marginTop: 'auto', marginBottom:'auto'}]}>
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn]}  onPress={handleDelete}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.coloredText, mystyle.centered]} >Delete</Text>
    </TouchableOpacity>
    
    {product.maturity?
    <View>
    {product.confection === 'Frozen'? 
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn]} onPress={unFreeze}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Unfreeze</Text>
    </TouchableOpacity>
    : <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn]}  onPress={handleFreeze}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Freeze</Text>
      </TouchableOpacity>
    }
    </View>
    : <View></View>}
</View>
)}

export default RowMid;