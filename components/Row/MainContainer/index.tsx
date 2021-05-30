import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, Animated} from 'react-native';
import { RowProps} from '../../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from '../../Modal';
import RowTop from './RowTop';
import RowMid from './RowMid';
import RowBot from './RowBot';
import mystyle from '../../../constants/mystyle';

const MainContainer = ({product}: RowProps) => {
  const [modal, OpenModal] = useState<boolean>(true);
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
      }, [modal])
    
  const handleEdit = () => {
    OpenModal(!modal);
  }
  const gradient = { uri: "https://i.pinimg.com/originals/64/99/fb/6499fbceda30cc9de9d688205cad4fb0.jpg" };
  
  return (
  <>
  {modal?
  <View style={{flex: 1, marginHorizontal: 10}}>
    <Animated.View style={{opacity: fadeAnim}}>
    <View key={product.id} style={mystyle.myMainBlock}>
      <ImageBackground source={gradient} style={{width: '100%'}} imageStyle={{ borderRadius: 15}}>
        <View style={{paddingHorizontal: 20,paddingVertical: 10,}}>
          <RowTop product={product}></RowTop>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <RowBot product={product}></RowBot>
            <View>
              <RowMid product={product}></RowMid>
              <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn]} onPress={handleEdit}>
                <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.coloredText, mystyle.centered]} >Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
    </Animated.View>
  </View> 
: <View>
  <TouchableOpacity onPress={handleEdit}>
<Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.coloredText, {marginTop: 20}]} >Close</Text>
</TouchableOpacity>
    <Modal item={product}></Modal>
</View>
}
</>
)}

export default MainContainer;