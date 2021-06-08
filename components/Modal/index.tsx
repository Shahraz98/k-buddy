import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, Text} from 'react-native';
import {format} from 'date-fns';
import Form from '../Form'
import {ProductProps} from '../../types';
import mystyle from '../../constants/mystyle';
import Success from '../Success';
import {getSingleProduct} from '../../utils/actions';

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
       const ProductRef = getSingleProduct(item.id);
       if(nmaturity){ //handling products with maturity separately to avoid errors related to additional properties
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
       } else { //handling standard products without maturity
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
<View style={[mystyle.myModalContainer, mystyle.myMainWhiteBtn, mystyle.centered]}>
    {changed? 
    <Success mainText='Item changed successfully.' subText='You can now close this modal.'></Success>
    : <Form onDataReady={handleChange} editor={true} product={item}></Form>
}
</View>
</Animated.View>
)}

export default Modal;