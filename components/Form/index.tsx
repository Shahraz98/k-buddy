import * as React from 'react';
import { useState} from 'react';
import { View, Text, StyleSheet,Image,Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors'
import { DatePickerModal } from 'react-native-paper-dates';
import {FormProps} from '../../types';
import mystyle from '../../constants/mystyle'
import OptionList from './OptionList/index';
import TextField from './TextField/index';
import {LinearGradient} from 'expo-linear-gradient';
import {handleBarCodeScanned} from '../../utils/query';

const Form = ({onDataReady, product, editor}:FormProps)  => {
  const [datepick, setDatepick] = useState<Date | undefined>(product? 
  product.expiry? new Date(product.expiry) : new Date() : new Date());
  const [open, setOpen] = useState(false);
  const [scanner, setScanner] = useState<boolean>(false);
  const [inputsArray, setInputsArray] = useState<string[]>(product?
  [product.name, product.brand? product.brand : '', product.category? product.category : '', 
  product.location? product.location : '', product.confection? product.confection : '', 
  product.maturity? product.maturity : ''] : ['','','','','', '']);
  const confectionsWFresh:Array<string> = ['Fresh','Box', 'Canned', 'Bag', 'Liquid', 'Cured'];
  const confectionsWOFresh:Array<string> = confectionsWFresh.slice(1);
  const ripeness:Array<string>  = ['Underripe', 'Barely Ripe', 'Ripe', 'Very Ripe', 'Overripe'];

  const handleUpdate = (val:string,i:number) => {
    //handling update of each value inside the inputs array
    let items = [...inputsArray]; items[i] = val; setInputsArray(items);
  }

  const handleAll = (myName:string, myBrand:string, myCategory:string) => {
    //Saving scanned values in inputs
    let items = [...inputsArray]; 
    items[0] = myName;
    items[1] = myBrand;
    items[2] = myCategory;
    setInputsArray(items);
  }

  const handleCodeScanned = async ({data}:any) => {
      const resultArray:Array<string> = await handleBarCodeScanned(data);
      handleAll(resultArray[0], resultArray[1], resultArray[2]);
      setScanner(false)
  };

  const onConfirmSingle = React.useCallback(
    //Handling picking of date from params
    (params) => {
      setOpen(false);
      setDatepick(params.date);
    },
    [setOpen, setDatepick]
  );
  
  const onDismiss = () => {
  //Resetting the date when closing date modal
  setDatepick(new Date())
  setOpen(false);
  }
  
  return (
  <View style={[mystyle.myFormContainer, mystyle.centered]}>
    {editor? <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Edit {inputsArray[0]}</Text>
    : <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Add Ingredient</Text>}
    <View style={{flexDirection: 'row'}}>
      <TextField handleUpdate={handleUpdate} titleArr={inputsArray} arrIndex={0} placeHold={"Name"}></TextField>
      <TextField handleUpdate={handleUpdate} titleArr={inputsArray} arrIndex={1} placeHold={"Brand"}></TextField>
    </View>
    <View style={{flexDirection: 'row'}}>
      <TextField handleUpdate={handleUpdate} titleArr={inputsArray} arrIndex={2} placeHold={"Category"}></TextField>
      <TextField handleUpdate={handleUpdate} titleArr={inputsArray} arrIndex={3} placeHold={"Location"}></TextField>
    </View>
    <View>
      <TouchableOpacity style={mystyle.myMainWhiteBtn} onPress={() => setOpen(true)}>
        <Text style={[mystyle.coloredText, mystyle.centered, mystyle.smText, {marginTop: 30}]}>{editor? <Text>Change </Text> : <Text>Select </Text>}Expiry Date</Text>
      </TouchableOpacity>
      <DatePickerModal mode="single" visible={open} onDismiss={onDismiss} date={datepick}
      onConfirm={onConfirmSingle} validRange={{startDate: new Date()}} saveLabel="Confirm"/>
    {editor?
    <View>
      {inputsArray[4] === 'Fresh' || inputsArray[4] === 'Frozen'?
      <><Text style={[mystyle.centered, mystyle.coloredText, mystyle.xsText, {marginTop: 20, textAlign: 'center'}]}>
        Fresh items can only be set as Fresh or Frozen, use the 'Freeze' and 'Unfreeze' Buttons to handle your item's freezing status.</Text>
        <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={ripeness} arrIndex={5}/></>
        : <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={confectionsWOFresh} arrIndex={4}/>}
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]} 
    onPress={() => onDataReady(inputsArray[0], inputsArray[1], inputsArray[2], inputsArray[3], inputsArray[4], inputsArray[5], datepick)}>
      <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
        <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Edit</Text>
      </LinearGradient>
    </TouchableOpacity> 
    </View>
    :  <>
    <Text style={[mystyle.coloredText, mystyle.xsText, {marginTop: 20, marginHorizontal: 15, textAlign: 'center'}]}>
    If the expiry is omitted or does not exist, your ingredient will be set as "Expiring in 24 hours".</Text>
    <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={confectionsWFresh} arrIndex={4}/>
         {inputsArray[4] === 'Fresh'?
         <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={ripeness} arrIndex={5}/> : <View></View>}
         <><TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]}  
        onPress={() => onDataReady(inputsArray[0], inputsArray[1], inputsArray[2], inputsArray[3], inputsArray[4], inputsArray[5], datepick)}>
          <LinearGradient colors={[Colors.light.tint,Colors.light.tsecondary]} start={[0.3, 0.5]} style={{borderRadius: 15}}>
            <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainWhiteBtn, mystyle.centered]} onPress={()=>setScanner(true)}>
          <LinearGradient colors={[Colors.light.gray, Colors.light.dsecondary]} start={[0.2, 0.5]} style={{borderRadius: 15}}>
            <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Scan Bar Code</Text>
          </LinearGradient>
        </TouchableOpacity>
    {scanner?
    <><BarCodeScanner onBarCodeScanned={handleCodeScanned} style={StyleSheet.absoluteFill}>
        <Text style={[mystyle.myScannerText, mystyle.centered, mystyle.whiteText]}>Scan Bar Code</Text>
        <Button color={Colors.light.background} title={'Close'} onPress={() => setScanner(false)}></Button>
        <Image style={[mystyle.centered, mystyle.myScannerImg]} source={require('../../assets/images/scan.png')}/>
    </BarCodeScanner></> : <View></View>}
    </>
    </>}
    </View>
</View>
)}
export default Form;