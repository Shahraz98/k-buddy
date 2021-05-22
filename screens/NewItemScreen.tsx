import * as React from 'react';
import { useState, useEffect} from 'react';
import { StyleSheet,Image,Button,ScrollView, TouchableWithoutFeedback, Keyboard, Picker, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from '../utils/firebase.js';
import { format} from 'date-fns'
import { View, Text } from '../components/Themed';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function NewItemScreen() {

    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [confection, setConfection] = useState<string>('');
    const [maturity, setMaturity] = useState<string>('');
    const [showMaturity, setshowMaturity] = useState<boolean>(false);
    const [datepick, setDatepick] = useState(new Date());
    const [added, setAdded] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanner, setScanner] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toJson = (response: Response): Promise<any> => {
    if (!response.ok) 
      throw new Error("error in the response: " + response.status)
    return response.json()
  }

  const handleBarCodeScanned = async ({data}:any) => {
    setScanner(false);
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}`)
        const json = await toJson(response)
        const categoryName = json.product.categories_hierarchy[0].substring(3);
        const fixedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        setName(json.product.product_name)
        setCategory(fixedCategory)
        setBrand(json.product.brands)
      } catch(err) {
          console.log("error", err)
      }
  };
  
  if (hasPermission === null) {
      return <>
          <Text style={{fontStyle: 'italic', marginRight: 'auto', marginLeft: 'auto', marginTop: 15}}>Requesting for camera permission.</Text>
          <Text style={{fontWeight: 'bold', marginRight: 'auto', marginLeft: 'auto', marginTop: 15}}>Scanning items is only possible through camera access.</Text>
          </>;
  }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const onConfirm = (selectedDate:Date) => {
        setDatepick(selectedDate);
        hideDatePicker();
    };

    const addItem = () => {
        const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
        const expiry = format(datepick,"yyyy-MM-dd'T'HH:mm");
        if(name != '') {
            const ProductRef = firebase.database().ref("Product");
            if(confection != 'Fresh'){
                const product = {
                    name,
                    brand,
                    category,
                    location,
                    confection,
                    expiry,
                    addedOn:now,
                    isOpen: false,
                }
        
                ProductRef.push(product);
                setAdded(true)
            }
            else {
                setshowMaturity(true);
                if(maturity != ''){
                    const product = {
                        name,
                        brand,
                        category,
                        location,
                        confection,
                        maturity,
                        maturitydate:now,
                        expiry,
                        addedOn:now,
                        isOpen: false,
                    }
            
                    ProductRef.push(product);
                    setAdded(true)
                    setMaturity('')
                }
                else Alert.alert('Ripeness Status','Please provide a ripeness status for your fresh ingredients!');
            }
        }
        else Alert.alert('Name required','To be able to add your ingredient a name will be necessary, please fill out the first text-field.');
    }

    const handleReset = () => {
        setAdded(false);
        setshowMaturity(false);
        setMaturity('');
        setCategory('');
        setName('');
        setBrand('');
        setLocation('');
        setConfection('');
        setDatepick(new Date());

    }

    
    return (
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <ScrollView>
                {added? 
                <View style={{marginLeft:'auto', marginRight: 'auto'}}>
                    <Text style={styles.headerText}>Item has been successfully added.</Text>
                    <Text>Go to the next tab to view it,</Text>
                    <Text>or</Text>
                    <TouchableOpacity style={styles.anotherbutton} onPress={handleReset}>
                    <Text style={styles.buttonText}>Add another</Text>
                    </TouchableOpacity>
                </View>
                : <View style={styles.inputContainer}>
                    <Text style={styles.headerText}>Add your new ingredient</Text>
                    <TextInput
                        value={name}
                        onChangeText={(e) => setName(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Please provide a name for your ingredient."}></TextInput>
                    <TextInput
                        value={brand}
                        onChangeText={(e) => setBrand(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Please provide a brand for your ingredient."}></TextInput>
                    <TextInput
                        value={category}
                        onChangeText={(e) => setCategory(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Please provide a category for your ingredient."}></TextInput>
                        {showMaturity? 
                        <View>
                         <Text 
                         style={{marginRight:'auto', marginLeft:'auto', marginTop: 10, fontWeight: 'bold'}}>
                             Select Ripeness Status for your ingredient:
                        </Text>
                                 <Picker
                                 selectedValue={maturity}
                                 style={{ height: 150, width: 150, marginRight: 'auto', marginLeft:'auto'}}
                                 onValueChange={(itemValue:string) => setMaturity(itemValue)}>
                                 <Picker.Item label="Underripe" value="Underripe" />
                                 <Picker.Item label="Barely Ripe" value="Barely Ripe" />
                                 <Picker.Item label="Ripe" value="Ripe" />
                                 <Picker.Item label="Very Ripe" value="Very Ripe" />
                                 <Picker.Item label="Overripe" value="Overripe" />
                        </Picker>
                        </View>
                        : <View>
                          <Text style={{marginRight:'auto', marginLeft:'auto', marginTop: 10}}>Please select a confection type for your ingredient:</Text>
                                    <Picker
                                    selectedValue={confection}
                                    style={{ height: 150, width: 150, marginRight: 'auto', marginLeft:'auto'}}
                                    onValueChange={(itemValue:string) => setConfection(itemValue)}>
                                      <Picker.Item label="Canned" value="Canned" />
                                      <Picker.Item label="Fresh" value="Fresh" />
                                      <Picker.Item label="Cured" value="Cured" />
                                      <Picker.Item label="Bag" value="Bag" />
                                      <Picker.Item label="Liquid" value="Liquid" />
                                    </Picker>
                          </View>
                        }
                    <TextInput
                        value={location}
                        onChangeText={(e) => setLocation(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.mainInput}
                        placeholder={"Please provide a location for your ingredient."}></TextInput>
                    <Button color='#FF5733' title="Select Expiry Date" onPress={showDatePicker} />
                    <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={onConfirm}
                    onCancel={hideDatePicker}
                    />
                    <TouchableOpacity style={styles.button} onPress={addItem}>
                    <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    {hasPermission? <><TouchableOpacity style={styles.scanButton} onPress={()=>setScanner(true)}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                    {scanner?
                    <>
                    <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}>
                    <Text style={{color:'#ffffff', fontSize: 35, marginRight: 'auto', marginLeft:'auto', marginVertical: 50}}>Scan your QR Code</Text>
                    <Image style={{height: 200, width: 200, marginRight: 'auto', marginLeft:'auto', marginVertical: 50}} source={require('../assets/images/scan.png')}/>
                    <Button color='white' title={'Close'} onPress={() => setScanner(false)}></Button>
                    </BarCodeScanner>
                    </>
                    : <View></View>}</>
                    : <View></View>}
                  </View>
                }
            </ScrollView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    inputContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headerText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        marginBottom: 20,
        color: '#FF5733',
    },
    mainInput: {
        height: 50,
        width: 350,
        fontSize: 14,
        paddingLeft: 10,
        paddingTop: 14,
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: '#F3F3F4',
    },
    button: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#FF5733',
        borderRadius: 30,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    scanButton: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: '#30303b',
        borderRadius: 30,
        width: 185,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    anotherbutton: {
        backgroundColor: '#FF5733',
        borderRadius: 30,
        width: 180,
        marginTop: 20,
    },
    buttonText: {
        paddingHorizontal: 33,
        paddingVertical: 10,
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 16,
    }
});