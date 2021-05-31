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
    let items = [...inputsArray]; items[i] = val; setInputsArray(items);
  }

  const handleAll = (myName:string, myBrand:string, myCategory:string) => {
    let items = [...inputsArray]; 
    items[0] = myName;
    items[1] = myBrand;
    items[2] = myCategory;
    setInputsArray(items);
  }

  const toJson = (response: Response): Promise<any> => {
    if (!response.ok) 
      throw new Error("error in the response: " + response.status)
    return response.json()
  }

  const handleBarCodeScanned = async ({data}:any) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}`)
      const json = await toJson(response);
      let myCategory = 'Category not found';
      let myName = 'Name not found';
      let myBrand = 'Brand not found';
      if(json.product.categories_hierarchy){
        const categoryName = json.product.categories_hierarchy[0].substring(3);
        myCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      }
      if(json.product.product_name){
        myName = json.product.product_name;
      }
      if(json.product.brands){
        myBrand = json.product.brands;
      }
      handleAll(myName, myBrand, myCategory);
      setScanner(false)
      } catch(err) {
          console.log("error", err)
          setScanner(false)
      }
  };

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDatepick(params.date);
    },
    [setOpen, setDatepick]
  );
  
  const onDismiss = () => {
  setDatepick(new Date())
  setOpen(false);
  }
  
  return (
  <View style={[mystyle.myFormContainer, mystyle.centered, mystyle.myMainWhiteBtn]}>
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
                    {editor?
                    <View>
                      {inputsArray[4] === 'Fresh' || inputsArray[4] === 'Frozen'?
                      <Text style={[mystyle.centered, mystyle.coloredText, mystyle.xsText, {marginTop: 20, textAlign: 'center'}]}>
                        Fresh items can only be set as Fresh or Frozen, use the 'Freeze' and 'Unfreeze' Buttons to handle your item's freezing status.</Text>
                      : <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={confectionsWOFresh} arrIndex={4}/>}
                    </View>
                :  <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={confectionsWFresh} arrIndex={4}/>}
                    </View>
                    {inputsArray[4] === 'Fresh'? 
                    <View>
                      <OptionList handleUpdate={handleUpdate} titleArr={inputsArray} groupArr={ripeness} arrIndex={5}/>
                    </View>
                    : <View></View>}
                    <TouchableOpacity style={mystyle.myMainWhiteBtn} onPress={() => setOpen(true)}>
                      <Text style={[mystyle.coloredText, mystyle.centered, mystyle.smText, {marginVertical: 22}]}>Select Expiry Date</Text>
                    </TouchableOpacity> 
                    <DatePickerModal mode="single" visible={open} onDismiss={onDismiss} date={datepick}
                    onConfirm={onConfirmSingle} validRange={{startDate: new Date()}} saveLabel="Confirm"/>
                    {editor?
                    <TouchableOpacity 
                    style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]} 
                    onPress={() => onDataReady(inputsArray[0], inputsArray[1], inputsArray[2], inputsArray[3], inputsArray[4], inputsArray[5], datepick)}>
                    <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Edit</Text>
                    </TouchableOpacity> 
                    : <>
                    <TouchableOpacity 
                    style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]} 
                    onPress={() => onDataReady(inputsArray[0], inputsArray[1], inputsArray[2], inputsArray[3], inputsArray[4], inputsArray[5], datepick)}>
                    <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainBlackBtn, mystyle.centered]} onPress={()=>setScanner(true)}>
                    <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Scan QR Code</Text>
                    </TouchableOpacity>
                    {scanner?
                    <>
                    <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}>
                      <Text style={[mystyle.myScannerText, mystyle.centered, mystyle.whiteText]}>Scan QR Code</Text>
                      <Button color={Colors.light.background} title={'Close'} onPress={() => setScanner(false)}></Button>
                      <Image style={[mystyle.centered, mystyle.myScannerImg]} source={require('../../assets/images/scan.png')}/>
                    </BarCodeScanner>
                    </>
                    : <View></View>}
                  </>}
  </View>
)}
export default Form;