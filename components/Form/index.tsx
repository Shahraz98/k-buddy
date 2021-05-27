import * as React from 'react';
import { useState} from 'react';
import { View, Text, StyleSheet,Image,Button,Picker, ImageBackground} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './styles';
import Colors from '../../constants/Colors'
import { ProductType, StringCallback} from '../../types.js';
import { Select, Option } from "react-native-single-select";


export type FormProps = {
    onDataReady: StringCallback,
    product?: ProductType,
    editor: boolean
}

const Form = ({onDataReady, product, editor}:FormProps)  => {

    const [name, setName] = useState<string>(product? product.name : '');
    const [brand, setBrand] = useState<string | undefined>(product? product.brand : '');
    const [category, setCategory] = useState<string | undefined>(product? product.category : '');
    const [location, setLocation] = useState<string | undefined>(product? product.location : '');
    const [confection, setConfection] = useState<string>(product? product.confection? product.confection : '' : '');
    const [maturity, setMaturity] = useState<string>(product? product.maturity? product.maturity : '' : '');
    const [datepick, setDatepick] = useState<Date | undefined>(product? new Date(product.expiry!) : new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [scanner, setScanner] = useState<boolean>(false);

    const gradient = { uri: "https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-076-premium-dark.png" };

    const onConfirm = (selectedDate:Date) => {
        setDatepick(selectedDate);
        setDatePickerVisibility(false);
    };

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

const ripeness = [
    { id: "Underripe", name: "Underripe" },
    { id: "Barely Ripe", name: "Barely Ripe" },
    { id: "Ripe", name: "Ripe" },
    { id: "Very Ripe", name: "Very Ripe" },
    { id: "Overripe", name: "Overripe" },
];

  const confections = [
    { id: "Canned", name: "Canned" },
    { id: "Fresh", name: "Fresh" },
    { id: "Cured", name: "Cured" },
    { id: "Box", name: "Box" },
    { id: "Bag", name: "Bag" },
    { id: "Liquid", name: "Liquid" },
  ];
return (

<View style={styles.inputContainer}>
<ImageBackground source={gradient} style={{width: '100%'}} imageStyle={{ borderRadius: 15}}>
    {editor? <Text style={styles.headerText}>Edit Ingredient</Text>
: <Text style={styles.headerText}>Add Ingredient</Text>}
                    <TextInput
                        value={name}
                        onChangeText={(e) => setName(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"What should we call your ingredient?"}
                        placeholderTextColor={Colors.light.tint}></TextInput>
                    <TextInput
                        value={brand}
                        onChangeText={(e) => setBrand(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Your ingredient's brand goes here."}
                        placeholderTextColor={Colors.light.tint}></TextInput>
                    <TextInput
                        value={category}
                        onChangeText={(e) => setCategory(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"How would you categorize your ingredient?"}
                        placeholderTextColor={Colors.light.tint}></TextInput>
                        <View>
                          <Text style={{marginRight:'auto', marginLeft:'auto', marginTop: 10, color: Colors.light.background}}>Please select a confection:</Text>
                          <Select
          onSelect={(v:string) => setConfection(v)}
          defaultText={confection}
          style={{ backgroundColor: 'white', borderRadius: 15, height: 40, marginLeft: 'auto', marginRight: 'auto', marginVertical: 10}}
          textStyle={{color: 'black', marginLeft: 'auto', marginRight: 'auto'}}
          backdropStyle={{opacity: 1, borderRadius: 30}}
          optionListStyle={{ position: 'absolute',backgroundColor: "#F5FCFF", borderRadius: 5, width: '90%'}}
          transparent
          data={confections}
          value={confection}
        />
                          </View>
                        {confection === 'Fresh'? 
                        <View >
                         <Text 
                         style={{marginRight:'auto', marginLeft:'auto', color: Colors.light.background}}>
                             Ripeness Status of your ingredient:
                        </Text>
                        <Select
          onSelect={(value) => setMaturity(value)}
          defaultText={maturity}
          style={{ backgroundColor: 'white', borderRadius: 15, height: 40, marginLeft: 'auto', marginRight: 'auto', marginVertical: 10}}
          textStyle={{color: 'black', marginLeft: 'auto', marginRight: 'auto'}}
          backdropStyle={{opacity: 1, borderRadius: 30}}
          optionListStyle={{ position: 'absolute',backgroundColor: "#F5FCFF", borderRadius: 5, width: '85%'}}
          transparent
          data={ripeness}
          value={maturity}
        />
                        </View>
                        : <View></View>
                        }
                    <TextInput
                        value={location}
                        onChangeText={(e) => setLocation(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Your ingredient's current location goes here."}
                        placeholderTextColor={Colors.light.tint}></TextInput>
                    <Button color={Colors.light.tint} title="Select Expiry Date" onPress={() => setDatePickerVisibility(true)} />
                    <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={onConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => onDataReady(name, brand, category, location,confection, maturity, datepick)}>
                    <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    {editor? <View></View> 
                    : <>
                    <TouchableOpacity style={styles.scanButton} onPress={()=>setScanner(true)}>
                    <Text style={[styles.buttonText, {color: Colors.light.tint}]}>Scan QR Code</Text>
                    </TouchableOpacity>
                    {scanner?
                    <>
                    <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}>
                    <Text style={{color:'#ffffff', fontSize: 35, marginRight: 'auto', marginLeft:'auto', marginVertical: 50}}>Scan your QR Code</Text>
                    <Image style={{height: 200, width: 200, marginRight: 'auto', marginLeft:'auto', marginVertical: 50}} source={require('../../assets/images/scan.png')}/>
                    <Button color='white' title={'Close'} onPress={() => setScanner(false)}></Button>
                    </BarCodeScanner>
                    </>
                    : <View></View>}
                    </>}
                    </ImageBackground>
</View>
)}

export default Form;