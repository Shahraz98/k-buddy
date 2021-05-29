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
  const [name, setName] = useState<string>(product? product.name : '');
  const [brand, setBrand] = useState<string | undefined>(product? product.brand : '');
  const [category, setCategory] = useState<string | undefined>(product? product.category : '');
  const [location, setLocation] = useState<string | undefined>(product? product.location : '');
  const [confection, setConfection] = useState<string>(product? product.confection? product.confection : '' : '');
  const [maturity, setMaturity] = useState<string>(product? product.maturity? product.maturity : '' : '');
  const [datepick, setDatepick] = useState<Date | undefined>(product? new Date(product.expiry!) : new Date());
  const [open, setOpen] = useState(false);
  const [scanner, setScanner] = useState<boolean>(false);

    
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
        setName(json.product.product_name)
        setCategory(fixedCategory)
        setBrand(json.product.brands)
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
    {editor? <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Edit {name}</Text>
    : <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Add Ingredient</Text>}
                    <TextInput
                        value={name}
                        onChangeText={(e) => setName(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn,mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Name"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    <TextInput
                        value={brand}
                        onChangeText={(e) => setBrand(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Brand"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    <TextInput
                        value={category}
                        onChangeText={(e) => setCategory(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Category"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                    <View>
                      <List.Section style={[mystyle.centered,{backgroundColor: Colors.light.background, width: '80%', borderRadius: 15}]}>
                        <List.Accordion
                        titleStyle={{color: Colors.light.tint}}
                        title={confection === ''? 'Choose Confection' : confection}
                        left={props => <List.Icon {...props} color={Colors.light.tint} icon="basket" />}>
                          <List.Item onPress={() => setConfection('Canned')} title="Canned" />
                          <List.Item onPress={() => setConfection('Fresh')} title="Fresh" />
                          <List.Item onPress={() => setConfection('Bag')} title="Bag" />
                          <List.Item onPress={() => setConfection('Cured')} title="Cured" />
                          <List.Item onPress={() => setConfection('Liquid')} title="Liquid" />
                          <List.Item onPress={() => setConfection('Basket')} title="Basket" />
                        </List.Accordion>
                      </List.Section>
                    </View>
                    {confection === 'Fresh'? 
                    <View>
                      <List.Section style={[mystyle.centered,{backgroundColor: Colors.light.background, width: '80%', borderRadius: 15}]}>
                        <List.Accordion
                        titleStyle={{color: Colors.light.tint}}
                        title={maturity === ''? 'Choose Ripeness' : maturity}
                        left={props => <List.Icon {...props} color={Colors.light.tint} icon="circle" />}>
                          <List.Item onPress={() => setMaturity('Underripe')} title="Underripe" />
                          <List.Item onPress={() => setMaturity('Almost Ripe')} title="Almost Ripe" />
                          <List.Item onPress={() => setMaturity('Ripe')} title="Ripe" />
                          <List.Item onPress={() => setMaturity('Very Ripe')} title="Very Ripe" />
                          <List.Item onPress={() => setMaturity('Overripe')} title="Overripe" />
                        </List.Accordion>
                      </List.Section>
                    </View>
                    : <View></View>}
                    <TouchableOpacity style={mystyle.myMainWhiteBtn} onPress={() => setOpen(true)}>
                      <Text style={[mystyle.coloredText, mystyle.centered, mystyle.smText]}>Select Expiry Date</Text>
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
                    <TextInput
                        value={location}
                        onChangeText={(e) => setLocation(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={[mystyle.myMainInput, mystyle.myMainWhiteBtn, mystyle.centered, mystyle.smText, mystyle.blackText]}
                        placeholder={"Location"}
                        placeholderTextColor={Colors.light.gray}></TextInput>
                  {editor?
                    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]} onPress={() => onDataReady(name, brand, category, location,confection, maturity, datepick)}>
                    <Text style={[mystyle.myformBtnText, mystyle.smText, mystyle.whiteText]}>Edit</Text>
                    </TouchableOpacity> 
                    : <>
                    <TouchableOpacity style={[mystyle.myMainBtn, mystyle.myMainColoredBtn, mystyle.centered]} onPress={() => onDataReady(name, brand, category, location,confection, maturity, datepick)}>
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