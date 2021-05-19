import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Picker} from 'react-native';
import {ProductType} from '../../types';
import styles from './styles';
import firebase from '../../utils/firebase.js';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export type ProductProps = {
item: ProductType,
}

const Modal = ({item}: ProductProps) => {

    const [itemname, setName] = useState(item.name);
    const [changed, setChanged] = useState<boolean>(false);
    const [itemcategory, setCategory] = useState(item.category);
    const [itemlocation, setLocation] = useState(item.location);
    const [itemmaturity, setMaturity] = useState(item.maturity);
    const [itemconfection, setConfection] = useState(item.confection);
    const [itemexpiry, setExpiry] = useState(new Date(moment(item.expiry).format('YYYY-MM-DD')));

    const onChange = (event:any, selectedDate:Date | void) => {
        const currentDate = selectedDate || itemexpiry;
        setExpiry(currentDate);
    };

    const handleChange = async () => {
    try {
       const now = moment().format('YYYY-MM-DD HH');
       const ProductRef = firebase.database().ref("Product").child(item.id);
       if(itemmaturity){
        await ProductRef.update({
           name: itemname,
           category: itemcategory,
           location: itemlocation,
           maturity: itemmaturity,
           maturitydate: now,
           expiry: moment(itemexpiry).format('YYYY-MM-DD HH')
        })
       } else {
           await ProductRef.update({
           name: itemname,
           category: itemcategory,
           location: itemlocation,
           confection: itemconfection,
           expiry: moment(itemexpiry).format('YYYY-MM-DD HH')
       })};
       setChanged(true);}
       catch(error) {console.log('error', error)}
    }

return (

<View style={styles.container}>
    {changed? 
    <View style={{marginLeft: 25, marginTop: '50%'}}>
        <Text style={styles.headerText}>Item changed successfully.</Text>
        <Text >You can now close this modal.</Text>
    </View> 
    : <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Making changes to {itemname}</Text>
                    <TextInput
                        value={itemname}
                        onChangeText={(e) => setName(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.itemInput}
                        placeholder={"Please provide a name for your ingredient."}></TextInput>
                    <TextInput
                        value={itemcategory}
                        onChangeText={(e) => setCategory(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.itemInput}
                        placeholder={"Please provide a category for your ingredient."}></TextInput>
                    {itemmaturity? 
                        <View>
                         <Text 
                         style={{marginRight:'auto', marginLeft:'auto', marginTop: 10, fontWeight: 'bold'}}>
                             Ripeness Status:
                        </Text>
                                 <Picker
                                 selectedValue={itemmaturity}
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
                                    selectedValue={itemconfection}
                                    style={{ height: 150, width: 150, marginRight: 'auto', marginLeft:'auto'}}
                                    onValueChange={(itemValue:string) => setConfection(itemValue)}>
                                      <Picker.Item label="Canned" value="Canned" />
                                      <Picker.Item label="Cured" value="Cured" />
                                      <Picker.Item label="Bag" value="Bag" />
                                      <Picker.Item label="Liquid" value="Liquid" />
                                    </Picker>
                          </View>
                        }
                    <TextInput
                        value={itemlocation}
                        onChangeText={(e) => setLocation(e)}
                        numberOfLines={3}
                        multiline={true}
                        style={styles.itemInput}
                        placeholder={"Please provide a location for your ingredient."}></TextInput>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginVertical: 20, color: 'rgb(0,122,255)'}}>Current expiry date:</Text>
                    <DateTimePicker
                    testID="dateTimePicker"
                    style={{marginLeft: '33%'}}
                    value={itemexpiry}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}/>
                    <TouchableOpacity style={styles.button} onPress={handleChange}>
                    <Text style={styles.buttonText}>Add Changes</Text>
                    </TouchableOpacity>
        </View>}
</View>)
}

export default Modal;