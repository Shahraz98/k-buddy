import React, {useEffect, useRef, useState} from 'react';
import {Text, View, Animated, Image} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNow} from 'date-fns'; 
import mystyle from '../../constants/mystyle';
import {ShapeProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';



const Rectangle = ({proname, prodate2, prodate1}: ShapeProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [url, setUrl] = useState<any>();
  const uripe = require(`../../assets/images/URipe.png`);
  const bripe = require(`../../assets/images/BRipe.png`);
  const ripe = require(`../../assets/images/Ripe.png`);
  const vripe = require(`../../assets/images/VRipe.png`);
  const oripe = require(`../../assets/images/ORipe.png`);
  const def = require(`../../assets/images/Default.png`);


  const translateRipeness = (ripeness:string) => {
    //Returning the pire chart based on ripeness, probably would have been nicer to use a switch statement
    if(ripeness === 'Underripe') return uripe;
    if(ripeness === 'Barely Ripe') return bripe;
    if(ripeness === 'Ripe') return ripe;
    if(ripeness === 'Very Ripe') return vripe;
    if(ripeness === 'Overripe') return oripe;
    else return def;
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
        const uri = translateRipeness(prodate1);
        setUrl(uri);
      }, [url]) 

return (
<View style={[mystyle.centered, mystyle.myShadow]}>
  <Animated.View style={{opacity: fadeAnim}}>
      <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.7, 0.8]} style={[mystyle.myRectangle,{borderRadius: 15}]}>
        <Text style={[ mystyle.centered, mystyle.smText, mystyle.coloredText, {fontWeight: 'bold', marginTop: 5}]}>{proname}</Text>
        <Text style={[ mystyle.centered, mystyle.xsText, mystyle.whiteText, {marginVertical: 5}]}>Checked {formatDistanceToNow(new Date(prodate2), { addSuffix: true })} as:</Text>
        <Image style={[mystyle.centered, {maxHeight: 100, maxWidth: 100}]} source={url}></Image>
        <View style={[mystyle.centered, {minWidth: '100%', marginTop: 17}]}>
          <LinearGradient colors={[Colors.light.tint, Colors.light.tsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
            <Text style={[ mystyle.xsText, mystyle.whiteText, mystyle.centered, {paddingVertical: 10, textTransform: 'uppercase'}]}>{prodate1}</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
  </Animated.View>
</View>
)}

export default Rectangle;