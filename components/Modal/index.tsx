import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, Alert} from 'react-native';
import Form from '../Form'
import {ModalProps} from '../../types';
import mystyle from '../../constants/mystyle';
import Warning from '../Warning';
import {handleUpdate} from '../../utils/actions';
import Colors from '../../constants/Colors';
import Success from '../Success';

const Modal = ({item, handleClosing}: ModalProps) => {
    const [changed, setChanged] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }
        ).start();
      }, [])
    
    const handleChange = async (nname:string,nbrand?:string,ncategory?:string,nlocation?:string,nconfection?:string,nmaturity?:string, nexpiry?:Date) => {
      if(nname != '' && nname != ' '){
      handleUpdate(item, nname, nbrand, ncategory, nlocation, nconfection, nmaturity, nexpiry)
      setChanged(true);}
      else Alert.alert('Name required','To be able to add your ingredient a name will be necessary.');
    }

return (
<Animated.View style={{opacity: fadeAnim}}>
  <View style={[mystyle.myModalContainer, mystyle.centered]}>
    {changed?
    <View style={[mystyle.centered]}>
       <Success addAnother={handleClosing} 
                mainText='Item changed successfully.' 
                subText='You can now close this modal.'
                buttonText='Close'></Success>
    </View>
    : <Form onDataReady={handleChange} editor={true} product={item}></Form>
    }
  </View>
</Animated.View>
)}

export default Modal;