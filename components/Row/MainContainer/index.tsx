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
    OpenModal(!modal);
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
    <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.blackText, {marginTop: 20}]}>Close</Text>
  </TouchableOpacity>
  <Modal item={item}></Modal>
</View>
}
</>
)}

export default MainContainer;