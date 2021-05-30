import * as React from 'react';
import { useState} from 'react';
import { View, Text, StyleSheet,Image,Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors'
import { DatePickerModal } from 'react-native-paper-dates';
import { List } from 'react-native-paper';
import {FormProps} from '../../types';
import mystyle from '../../constants/mystyle'

const Form = ({onDataReady, product, editor}:FormProps)  => {
  const [datepick, setDatepick] = useState<Date | undefined>(product? 
  product.expiry? new Date(product.expiry) : new Date() : new Date());
  const [open, setOpen] = useState(false);
  const [scanner, setScanner] = useState<boolean>(false);
  const [inputsArray, setInputsArray] = useState<string[]>(product?
  [product.name, product.brand? product.brand : '', product.category? product.category : '', 
  product.location? product.location : '', product.confection? product.confection : '', 
  product.maturity? product.maturity : ''] : ['','','','','', '']);
  const confections:Array<string> = ['Box', 'Fresh', 'Canned', 'Bag', 'Liquid', 'Cured'];
  const ripeness:Array<string>  = ['Underripe', 'Barely Ripe', 'Ripe', 'Very Ripe', 'Overripe'];

  const handleUpdate = (val:string,i:number) => {
    let items = [...inputsArray]; items[i] = val; setInputsArray(items);
  }
    
  const onConfirmSingle = React.useCallback(
      (params) => {
        setOpen(false);
        setDatepick(params.date);
      },
      [setOpen, setDatepick]
  );

  const handleBarCodeScanned = async ({data}:any) => {
    setScanner(false);
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}`)
        const json = await response.json();
        const categoryName = json.product.categories_hierarchy[0].substring(3);
        const fixedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        handleUpdate(json.product.product_name, 0);
        handleUpdate(json.product.brands, 1);
        handleUpdate(fixedCategory, 2);
      } catch(err) {
          console.log("error", err)
      }
  };
  
  const onDismiss = () => {
  setDatepick(new Date())
  setOpen(false);
  }
  
  return (
  <View style={[mystyle.myFormContainer, mystyle.centered, mystyle.myMainWhiteBtn]}>
    {editor? <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Edit {inputsArray[0]}</Text>
    : <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Add Ingredient</Text>}
                    <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={inputsArray[0]}
                        onChangeText={(e) => handleUpdate(e, 0)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn,mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Name"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    <TextInput
                        value={inputsArray[1]}
                        onChangeText={(e) => handleUpdate(e,1)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Brand"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={inputsArray[2]}
                        onChangeText={(e) => handleUpdate(e, 2)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Category"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    <TextInput
                        value={inputsArray[3]}
                        onChangeText={(e) => handleUpdate(e, 3)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Location"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    </View>
                    <View>
                    {editor?
                    <View>
                      {inputsArray[4] === 'Fresh'?
                      <Text>Fresh Items chan't change category!</Text>
                      : <List.Section 
                        style={[mystyle.centered,{backgroundColor: Colors.light.background, width: '80%', borderRadius: 15}]}>
                        <List.Accordion
                        titleStyle={mystyle.blackText}
                        title={inputsArray[4] === ''? 'Choose Confection' : inputsArray[4]}>
                          {confections.map((c) =>
                          <List.Item style={{paddingVertical: 2}} 
                          titleStyle={[mystyle.centered, mystyle.xsText, mystyle.blackText,]} 
                          key={c} onPress={() => handleUpdate(c, 4)} title={c} />)}
                        </List.Accordion>
                        </List.Section>}
                    </View>
                :  <List.Section
                   style={[mystyle.centered,{backgroundColor: Colors.light.background, width: '80%', borderRadius: 15}]}>
                     <List.Accordion
                     titleStyle={mystyle.blackText}
                     title={inputsArray[4] === ''? 'Choose Confection' : inputsArray[4]}>
                       {confections.map((c) => 
                       <List.Item style={{paddingVertical: 2}} 
                       titleStyle={[mystyle.centered, mystyle.xsText, mystyle.blackText,]} 
                       key={c} onPress={() => handleUpdate(c, 4)} title={c} />)}
                     </List.Accordion>
                   </List.Section>}
                    </View>
                    {inputsArray[4] === 'Fresh'? 
                    <View>
                      <List.Section style={[mystyle.centered,{backgroundColor: Colors.light.background, width: '80%', borderRadius: 15}]}>
                        <List.Accordion
                        titleStyle={mystyle.blackText}
                        title={inputsArray[5] === ''? 'Choose Ripeness' : inputsArray[5]}>
                          {ripeness.map((m) => 
                          <List.Item style={{paddingVertical: 2}}  
                          titleStyle={[mystyle.centered, mystyle.xsText, mystyle.blackText]} 
                          key={m} onPress={() => handleUpdate(m, 5)} title={m} />)}
                        </List.Accordion>
                      </List.Section>
                    </View>
                    : <View></View>}
                    <TouchableOpacity style={mystyle.myMainWhiteBtn} onPress={() => setOpen(true)}>
                      <Text style={[mystyle.coloredText, mystyle.centered, mystyle.smText, {marginVertical: 22}]}>Select Expiry Date</Text>
                    </TouchableOpacity> 
                    <DatePickerModal
                    mode="single"
                    visible={open}
                    onDismiss={onDismiss}
                    date={datepick}
                    onConfirm={onConfirmSingle}
                    validRange={{
                      startDate: new Date(),
                    }}
                    saveLabel="Confirm"/>
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
                      <Text style={[mystyle.myScannerText, mystyle.centered, mystyle.whiteText]}>Scan your QR Code</Text>
                      <Image style={[mystyle.centered, mystyle.myScannerImg]} source={require('../../assets/images/scan.png')}/>
                      <Button color={Colors.light.background} title={'Close'} onPress={() => setScanner(false)}></Button>
                    </BarCodeScanner>
                    </>
                    : <View></View>}
                  </>}
  </View>
)}
export default Form;