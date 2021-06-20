import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import mystyle from '../../constants/mystyle';
import {ColoredProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, SimpleLineIcons, FontAwesome, MaterialCommunityIcons, EvilIcons, Feather} from '@expo/vector-icons'; 



const ColoredView = ({item, short}: ColoredProps) => {
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
  <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
  <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
  <Text style={[mystyle.whiteText, mystyle.xsText]}><Ionicons name="md-fast-food-outline" size={16} color={Colors.light.dsecondary} /> Category: {item.category? item.category : 'N/A'}</Text>
  <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}><SimpleLineIcons name="bag" size={13} color={Colors.light.dsecondary} />  Confection Type: {item.confection? item.confection : 'N/A'}</Text>
  <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}><Feather name="shopping-bag" size={13} color={Colors.light.dsecondary} />  Location: {item.location? item.location : 'N/A'}</Text>
  {!short? 
    item.isOpen? 
    <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}><FontAwesome name="dropbox" size={15} color={Colors.light.dsecondary} /> Status: Open</Text>
    : <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 3}]}><MaterialCommunityIcons name="cube" size={16} color={Colors.light.dsecondary} /> Status: Closed</Text> : <View></View>}
  </View>
</LinearGradient>)
}

export default ColoredView;