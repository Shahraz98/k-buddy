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
import { isAfter } from 'date-fns';
import {handleReNew} from '../../../utils/actions';

const MainContainer = ({item}: ProductProps) => {
  const [modal, OpenModal] = useState<boolean>(true); 
  const fadeAnim = useRef(new Animated.Value(0)).current; //For fading-in animation
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
    
  const handleEdit = () => {
    if(isAfter(new Date(), new Date(item.expiry!))){
  alert("Can't edit an expired ingredient! Please buy another one and re-new it through the 'Re-New' button.")
    } else OpenModal(!modal);
  }
  
  return (
  <>
  {modal?
  <View style={{flex: 1, marginHorizontal: 10}}>
    <Animated.View style={{opacity: fadeAnim}}>
    <View key={item.id} style={mystyle.myMainBlock}>
      <LinearGradient
        colors={['white', Colors.light.background]}
        start={[0.5, 0.4]}
        style={{borderRadius: 15}}>
        <View style={{paddingHorizontal: 25,paddingVertical: 10}}>
          <RowTop item={item}></RowTop> 
          {item.expiry? 
    <View>
        {isAfter(new Date(), new Date(item.expiry))? 
      <View>
        <Text style={[mystyle.xsText, mystyle.centered, mystyle.coloredText]}>Ingredient is currently expired.</Text>
        <Text style={[mystyle.xsText, mystyle.centered]}>Click the button below to re-activate it.</Text>
        <TouchableOpacity style={[mystyle.centered, mystyle.myMainBtn, mystyle.myMainColoredBtn]} onPress={() => handleReNew(item)}> 
               <LinearGradient
              colors={[Colors.light.gray, Colors.light.dsecondary]}
              start={[0.2, 0.5]}
              style={{borderRadius: 15}}>
                <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Re-New</Text>
                </LinearGradient>
        </TouchableOpacity></View>
    : <View></View>}</View> : <View></View>}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RowBot item={item}></RowBot> 
            <View>
            <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn]} onPress={handleEdit}> 
               <LinearGradient
              colors={[Colors.light.tint,Colors.light.tsecondary]}
              start={[0.3, 0.5]}
              style={{borderRadius: 15}}>
                <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]} >Edit</Text>
                </LinearGradient>
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
  <TouchableOpacity onPress={handleEdit}>
  <AntDesign name="closecircle" size={24} color={Colors.light.gray} style={[mystyle.centered,{marginVertical: 7}]} />
  </TouchableOpacity>
  <Modal item={item}></Modal>
</View>
}
</>
)}

export default MainContainer;