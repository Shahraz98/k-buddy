import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, Text} from 'react-native';
import {format} from 'date-fns';
import Form from '../Form'
import {ProductProps} from '../../types';
import mystyle from '../../constants/mystyle';
import {getSingleProduct} from '../../utils/actions';
import Warning from '../Warning';
import {handleUpdate} from '../../utils/actions';
import Colors from '../../constants/Colors';

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
       handleUpdate(item, nname, nbrand, ncategory, nlocation, nconfection, nmaturity, nexpiry)
       setChanged(true);
    }

return (
<Animated.View style={{opacity: fadeAnim}}>
<View style={[mystyle.myModalContainer, mystyle.myMainWhiteBtn, mystyle.centered]}>
    {changed?
    <View style={[mystyle.centered, {marginTop: '50%'}]}>
    <Warning 
    mainText='Item changed successfully.' 
    subText='You can now close this modal.'
    positive={true}
    mainColor={Colors.light.gray}
    subColor={Colors.light.tint}
    iconColor={Colors.light.tint}></Warning></View>
    : <Form onDataReady={handleChange} editor={true} product={item}></Form>
}
</View>
</Animated.View>
)}

export default Modal;