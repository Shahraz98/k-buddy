import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import { ProductProps} from '../../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from '../../Modal';
import RowTop from './RowTop';
import RowMid from './RowMid';
import RowBot from './RowBot';
import mystyle from '../../../constants/mystyle';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons'; 
import MyButton from '../../Button';

const MainContainer = ({item}: ProductProps) => {
  const [modal, OpenModal] = useState<boolean>(true); 
  const fadeAnim = useRef(new Animated.Value(0)).current; //For fading-in animation
  const handleModal = () => {
    OpenModal(true)
  }
    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
          }
        ).start();
      }, [modal])
  
  return (
  <>
  {modal?
  <View style={{flex: 1, marginHorizontal: 10}}>
    <Animated.View style={{opacity: fadeAnim}}>
    <View key={item.id} style={[mystyle.myMainBlock, mystyle.myShadow]}>
      <LinearGradient colors={['white', Colors.light.background]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
        <View style={{paddingHorizontal: 25,paddingVertical: 10}}>
          <RowTop item={item}></RowTop>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RowBot item={item}></RowBot> 
            <View>
              <TouchableOpacity style={[mystyle.myMainBtn]} onPress={() => OpenModal(false)}> 
              <MyButton btnColor='tint' btnText='Edit'></MyButton>
              </TouchableOpacity>
              <RowMid item={item}></RowMid> 
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
    </Animated.View>
  </View> 
  : <View style={mystyle.centered}>
      <TouchableOpacity onPress={() => OpenModal(true)}>
        <AntDesign name="closecircle" size={24} color={Colors.light.gray} style={[mystyle.centered,{marginVertical: 7}]} />
      </TouchableOpacity>
      <Modal item={item} handleClosing={handleModal}></Modal>
    </View>
}
</>
)}

export default MainContainer;