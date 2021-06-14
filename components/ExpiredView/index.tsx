import React, {useEffect, useRef} from 'react';
import {Text, View, Animated, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNow} from 'date-fns';
import mystyle from '../../constants/mystyle';
import {ProductProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';
import {handleReNew, handleDelete} from '../../utils/actions';



const ExpiredView = ({item}: ProductProps) => {
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
   <View style={[mystyle.centered, mystyle.myShadow, {minWidth: '95%', marginBottom: 20}]}>
     <Animated.View style={{opacity: fadeAnim}}>
     <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.7, 0.8]} style={[{borderRadius: 15}]}>
         <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
         <View style={{marginLeft: 15, marginVertical: 30}}>
             <Text style={[ mystyle.bigText, mystyle.coloredText, {fontWeight: 'bold'}]}>{item.name}</Text>
             <Text style={[ mystyle.centered, mystyle.smText, mystyle.whiteText, {marginTop: 5}]}>Expired {formatDistanceToNow(new Date(item.expiry), { addSuffix: true })}.</Text>
         </View>
         <View style={[{backgroundColor: Colors.light.dsecondary,marginLeft: 'auto', borderRadius: 15, }]}>
         <LinearGradient colors={['white', Colors.light.background]} start={[0.1, 0.9]} style={{borderRadius: 15}}>
           <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn, {marginHorizontal: 15}]} onPress={() => handleReNew(item)}> 
             <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
               <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]}>Re-New</Text>
             </LinearGradient>
           </TouchableOpacity>
           <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, {marginHorizontal: 15}]}  onPress={() => handleDelete(item)}>
             <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
               <Text style={[mystyle.myformBtnText, mystyle.xsText, mystyle.whiteText, mystyle.centered]} >Delete</Text>
             </LinearGradient>
           </TouchableOpacity>
           </LinearGradient>
         </View>
         </View>
      </LinearGradient>
    </Animated.View>
  </View>)
}

export default ExpiredView;