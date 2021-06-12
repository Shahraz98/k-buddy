import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNow} from 'date-fns';
import { AntDesign, Ionicons} from '@expo/vector-icons'; 
import mystyle from '../../constants/mystyle';
import {BoughtProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';



const BoughtView = ({proname, bought}: BoughtProps) => {
  //added and expiry both are used to get the relevant info about the product and save it in a specific way inside the arrays
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
    
    
return (
   <>
    <View style={[mystyle.centered, mystyle.myShadow]}>
  <Animated.View style={{opacity: fadeAnim}}>
      <LinearGradient
              colors={[Colors.light.tint, Colors.light.tsecondary]}
              start={[0.1, 0.3]}
              style={[mystyle.myRectangle,{borderRadius: 15}]}>
      
      <Text style={[ mystyle.centered, mystyle.smText, mystyle.whiteText, {fontWeight: 'bold', marginTop: 5}]}>{proname}</Text>
      <View style={[mystyle.myMainWhiteBtn, {marginTop: 10, 
        borderTopEndRadius: 15, borderTopStartRadius: 15}]}>
      <Text style={[ mystyle.centered, mystyle.xsText, mystyle.coloredText, {marginVertical: 10}]}>Bought</Text>
      <Text style={[ mystyle.centered, mystyle.xsText, mystyle.blackText, {marginBottom: 10}]}>{formatDistanceToNow(new Date(bought), { addSuffix: true })}.</Text>
      </View>
      </LinearGradient>
      </Animated.View>
  </View>
   </>)
}

export default BoughtView;