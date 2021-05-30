import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import { formatDistanceToNowStrict, isAfter} from 'date-fns';
import { DataTable } from 'react-native-paper';
import { AntDesign, Ionicons} from '@expo/vector-icons'; 
import mystyle from '../../constants/mystyle';
import {SquareProps} from '../../types';



const Square = ({proname, proadd, proexp}: SquareProps) => {
  
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
    <DataTable style={mystyle.mydTable}>
      <Animated.View style={{opacity: fadeAnim}}>
      <DataTable.Header style={{borderBottomWidth: 0}}>
        <Text style={[mystyle.mydTableheader, mystyle.smText, mystyle.coloredText]}>
          {isAfter(new Date(), new Date(proexp))? 
          <Ionicons name="sad" size={21} color={Colors.light.gray} /> 
          : <AntDesign name="smile-circle" size={18} color={Colors.light.gray} />} {proname}
        </Text>
      </DataTable.Header>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell style={mystyle.mydTableCellRight}>Add <AntDesign name="check" size={14} color={Colors.light.tint}/></DataTable.Cell>
        <DataTable.Cell style={{paddingLeft: 10}}>Exp <AntDesign name="clockcircleo" size={14} color={Colors.light.tint}/></DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell style={mystyle.mydTableCellRight}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>{added[0]}</Text>
            <Text>{added[1]}</Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell style={[mystyle.mydTableCellRight,{paddingLeft: 10, borderRightWidth: 0}]}>
          {isAfter(new Date(), new Date(proexp))? <View style={{flexDirection: 'column'}}>
            <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>Oops</Text>
            <Text>expired</Text></View>
            : <View style={{flexDirection: 'column'}}>
              <Text style={[mystyle.stnText, mystyle.coloredText, {fontWeight: 'bold'}]}>{expiry[0]}</Text>
              <Text>{expiry[1]}</Text></View>}
        </DataTable.Cell>
      </DataTable.Row>
    <View style={{height: 15}}></View>
    </Animated.View>
    </DataTable>
)}

export default Square;