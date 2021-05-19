import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Picker, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../utils/firebase.js';
import moment from 'moment';
import { View, Text } from '../components/Themed';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewItemScreen() {

    const navigation = useNavigation();

    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [confection, setConfection] = useState<string>('');
    const [maturity, setMaturity] = useState<string>('');
    const [showMaturity, setshowMaturity] = useState<boolean>(false);
    const [datepick, setDatepick] = useState(new Date(moment().format('YYYY-MM-DD')));
    const [added, setAdded] = useState<boolean>(false);


    const addItem = () => {
        const now = moment().format('YYYY-MM-DD HH');
        const expiry = moment(datepick).format('YYYY-MM-DD HH');
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

    const onChange = (event:any, selectedDate:Date | void) => {
        const currentDate = selectedDate || datepick;
        setDatepick(currentDate);
    };

    const handleReset = () => {
        setAdded(false);
        setshowMaturity(false);
        setMaturity('');
        setCategory('');
        setName('');
        setBrand('');
        setLocation('');
        setConfection('');
        setDatepick(new Date(moment().format('YYYY-MM-DD')));

    }

    
    return (
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <ScrollView>
                {added? 
                <View style={{marginLeft: 25, marginTop: '50%'}}>
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
                        style={styles.tweetInput}
                        placeholder={"Please provide a name for your ingredient."}></TextInput>
                    <TextInput
                        value={brand}
                        onChangeText={(e) => setBrand(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.tweetInput}
                        placeholder={"Please provide a brand for your ingredient."}></TextInput>
                    <TextInput
                        value={category}
                        onChangeText={(e) => setCategory(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.tweetInput}
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
                        style={styles.tweetInput}
                        placeholder={"Please provide a location for your ingredient."}></TextInput>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginVertical: 20,}}>Provide an expiry date:</Text>
                    <DateTimePicker
                    testID="dateTimePicker"
                    style={{marginLeft: '33%'}}
                    value={datepick}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}/>
                    <TouchableOpacity style={styles.button} onPress={addItem}>
                    <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                }
            </ScrollView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',

    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    headerText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        marginBottom: 20,
        color: '#30303b',
    },
    inputContainer: {
        marginLeft: 15,
    },
    tweetInput: {
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
    dateInput: {
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        borderRadius: 15,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#30303b',
        borderRadius: 30,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        
    },
    anotherbutton: {
        backgroundColor: '#30303b',
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