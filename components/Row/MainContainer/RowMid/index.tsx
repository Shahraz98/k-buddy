import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { RowProps} from '../../../../types';
import firebase from '../../../../utils/firebase'
import { sub,format, add} from 'date-fns'
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../../constants/Colors';

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
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn]}  onPress={handleDelete}>
    <LinearGradient
              colors={[Colors.light.gray, Colors.light.dsecondary]}
              start={[0.2, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]} >Delete</Text>
        </LinearGradient>
    </TouchableOpacity>
    
    {product.maturity?
    <View>
    {product.confection === 'Frozen'? 
    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn]} onPress={unFreeze}>
        <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.3, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Unfreeze</Text>
        </LinearGradient>
    </TouchableOpacity>
    : <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn]}  onPress={handleFreeze}>
        <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.2, 0.5]}
              style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.coloredText, mystyle.centered]}>Freeze</Text>
        </LinearGradient>
      </TouchableOpacity>
    }
    </View>
    : <View></View>}
</View>
)}

export default RowMid;