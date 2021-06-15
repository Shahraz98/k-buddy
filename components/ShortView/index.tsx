import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNow} from 'date-fns';
import mystyle from '../../constants/mystyle';
import {ProductProps} from '../../types';
import {ProgressBar} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import { Feather, Ionicons, SimpleLineIcons, MaterialIcons} from '@expo/vector-icons'; 



const ShortView = ({item}: ProductProps) => {
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

      const translateRipeness = (ripeness:string) => {
        //Returning the progress status based on ripeness
        switch(ripeness){
            case 'Underripe':
            return 0.1;
            case 'Barely Ripe': 
            return 0.2;
            case 'Ripe':
            return 0.5;
            case 'Very Ripe':
            return 0.8;
            case 'Overripe':
            return 1;
            default: 
            return 0;
        }
    }
    
    
return (
    <View style={[mystyle.centered, mystyle.myShadow, {minWidth: '95%', marginBottom: 20}]}>
      <Animated.View style={{opacity: fadeAnim}}>
        <LinearGradient colors={[Colors.light.background, 'white']} start={[0.1, 0.3]} style={[{borderRadius: 15}]}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{marginLeft: 15, marginTop: 5}}>
          <Text style={[ mystyle.bigText, mystyle.blackText, {fontWeight: 'bold'}]}>{item.name}</Text>
          <Text style={[ mystyle.xsText, mystyle.secondaryColored]}>by {item.brand? item.brand : 'N/A'}</Text>
          </View>
          <View style={{marginLeft: 'auto', marginVertical: 5, marginRight: 5}}>
            <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
              <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Text style={[mystyle.whiteText, mystyle.xsText]}>Category: {item.category? item.category : 'N/A'} <Ionicons name="md-fast-food-outline" size={16} color={Colors.light.dsecondary} /></Text>
              <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}>Confection Type: {item.confection? item.confection : 'N/A'} <SimpleLineIcons name="bag" size={13} color={Colors.light.dsecondary} /></Text>
              <Text style={[mystyle.whiteText, mystyle.xsText, {marginTop: 5}]}>Location: {item.location? item.location : 'N/A'} <Feather name="shopping-bag" size={13} color={Colors.light.dsecondary} /></Text>
              </View>
            </LinearGradient>
          </View>
        </View>
        {item.maturity?
        <View style={[mystyle.centered,{marginVertical: 15}]}>
          <Text style={[mystyle.centered,mystyle.blackText, mystyle.xsText]}>Set {formatDistanceToNow(new Date(item.maturitydate!), { addSuffix: true })} as: 
          <Text style={mystyle.secondaryColored}> {item.maturity}</Text></Text>
          <ProgressBar style={[mystyle.centered, mystyle.myProgress, mystyle.myMainWhiteBtn]} 
          progress={translateRipeness(item.maturity)} color={Colors.light.tint}/>
        </View> : <View></View>}
        </LinearGradient>
      </Animated.View>
    </View>)
}

export default ShortView;