import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNowStrict, isAfter} from 'date-fns';
import { DataTable } from 'react-native-paper';
import { AntDesign, Ionicons} from '@expo/vector-icons'; 
import mystyle from '../../constants/mystyle';
import {SquareProps} from '../../types';
import {LinearGradient} from 'expo-linear-gradient';



const Square = ({proname, proadd, proexp}: SquareProps) => {
  //added and expiry both are used to get the relevant info about the product and save it in a specific way inside the arrays
  const added:Array<string> = formatDistanceToNowStrict(new Date(proadd), { addSuffix: false }).split(' ');
  const expiry:Array<string> = formatDistanceToNowStrict(new Date(proexp), { addSuffix: false }).split(' ');
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
    <DataTable style={[mystyle.mydTable, mystyle.centered]}>
      <Animated.View style={{opacity: fadeAnim}}>
      <LinearGradient
        colors={['white', Colors.light.background]}
        start={[0.5, 0.4]}
        style={{borderRadius: 15}}>
      <DataTable.Header style={{borderBottomWidth: 0}}>
        <Text style={[mystyle.mydTableheader, mystyle.smText, mystyle.coloredText]}>
          {isAfter(new Date(), new Date(proexp))? 
          <Ionicons name="sad" size={21} color={Colors.light.gray} /> 
          : <AntDesign name="smile-circle" size={18} color={Colors.light.gray} />} {proname}
        </Text>
      </DataTable.Header>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell style={mystyle.mydTableCellRight}><Text style={mystyle.blackText}>Add</Text> <AntDesign name="check" size={14} color={Colors.light.tsecondary}/></DataTable.Cell>
        <DataTable.Cell style={{paddingLeft: 10}}><Text style={mystyle.blackText}>Expiry</Text> <AntDesign name="clockcircleo" size={14} color={Colors.light.tsecondary}/></DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell style={mystyle.mydTableCellRight}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>{added[0]}</Text>
            <Text style={mystyle.secondaryBlack}>{added[1]}</Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell style={[mystyle.mydTableCellRight,{paddingLeft: 10, borderRightWidth: 0}]}>
          {isAfter(new Date(), new Date(proexp))? <View style={{flexDirection: 'column'}}>
            <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>Oops</Text>
            <Text style={mystyle.secondaryBlack}>expired</Text></View>
            : <View style={{flexDirection: 'column'}}>
              <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>{expiry[0]}</Text>
              <Text style={mystyle.secondaryBlack}>{expiry[1]}</Text></View>}
        </DataTable.Cell>
      </DataTable.Row>
    <View style={{height: 15}}></View>
    </LinearGradient>
    </Animated.View>
    </DataTable>
)}

export default Square;