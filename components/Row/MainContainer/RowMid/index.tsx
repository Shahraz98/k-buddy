import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { RowProps} from '../../../../types';
import firebase from '../../../../utils/firebase'
import { format, add, isAfter, formatDistanceToNow} from 'date-fns'
import mystyle from '../../../../constants/mystyle'
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../../../constants/Colors';

const RowMid = ({product}: RowProps) => {

    const ProductRef = firebase.database().ref("Product").child(product.id);

    const unFreeze =  () => {
        try {
            if(product.expiry){ //Check if expiry exists
                if(isAfter(new Date(), new Date(product.expiry))) { //Check if product is expired
                alert("This item is expired, you can't unfreeze an expired Item anymore.")}
                else { //If the product's expiry is in some days, months or years, it will be set to 1 day and the product will be set as Fresh
                    if(formatDistanceToNow(new Date(product.expiry)).includes('year')
                    || formatDistanceToNow(new Date(product.expiry)).includes('month')
                    || formatDistanceToNow(new Date(product.expiry)).includes('days')){
                        const temp = add(new Date(), {
                            days: 1,
                        })
                        const minEx = format(temp, "yyyy-MM-dd'T'HH:mm")
                        ProductRef.update({
                            expiry: minEx,
                            confection: 'Fresh'
                        })
                    } else { //If the product's expiry is very soon, f.e. in some hours, it will remain unchanged and only the product's confection will be affected
                        ProductRef.update({
                            confection: 'Fresh'
                        })
                    }
                }
            } else alert('This item does not have an expiry date, please set an expiry date before unfreezing it.');
     } catch(error) {console.log('error',error)}
    }

    const handleFreeze = async () => {
        //Same logic as unfreeze, this time we are adding 6 months to the product's expiry, if it exists and if it is in the future
    try {
        if(product.expiry){
            if(isAfter(new Date(), new Date(product.expiry))) {
            alert("This item is expired, you can't freeze an expired Item.")}
            else { const temp = add(new Date(product.expiry!), {
                months: 6,
            })
            const extended = format(temp, "yyyy-MM-dd'T'HH:mm")
            await ProductRef.update({
             expiry: extended,
             confection: 'Frozen'
            })
            }
        } else alert('This item does not have an expiry date, please set an expiry date before freezing it.');
    } catch(error) {console.log('error',error)}
    }

    const handleDelete = async () => {
        try {await ProductRef.remove();}
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
        <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Freeze</Text>
        </LinearGradient>
      </TouchableOpacity>
    }
    </View>
    : <View></View>}
</View>
)}

export default RowMid;