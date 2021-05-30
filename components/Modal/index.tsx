import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, Text} from 'react-native';
import firebase from '../../utils/firebase';
import {format} from 'date-fns';
import Form from '../Form'
import {ProductProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {Feather} from '@expo/vector-icons';
import Colors from '../../constants/Colors'

const Modal = ({item}: ProductProps) => {
    const [changed, setChanged] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
          }
        ).start();
      }, [])
    
    const handleChange = async (nname?:string,nbrand?:string,ncategory?:string,nlocation?:string,nconfection?:string,nmaturity?:string, nexpiry?:Date) => {
    try {
       const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
       const ProductRef = firebase.database().ref("Product").child(item.id);
       if(nmaturity){
        await ProductRef.update({
           name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           maturity: nmaturity,
           maturitydate: now,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
        })
       } else {
           await ProductRef.update({
            name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
       })};
       setChanged(true);}
       catch(error) {console.log('error', error)}
    }

return (
<Animated.View style={{opacity: fadeAnim}}>
<View style={[mystyle.myModalContainer, mystyle.myMainWhiteBtn]}>
    {changed? 
    <View style={[mystyle.centered,{marginTop: '50%'}]}>
        <Feather style={mystyle.centered} name="check-circle" size={30} color={Colors.light.tint} />
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Item changed successfully.</Text>
        <Text style={mystyle.centered}>You can now close this modal.</Text>
    </View> 
    : <Form onDataReady={handleChange} editor={true} product={item}></Form>
}
</View>
</Animated.View>
)}

export default Modal;