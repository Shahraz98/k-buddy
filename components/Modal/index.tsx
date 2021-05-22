import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput, Picker} from 'react-native';
import {ProductType} from '../../types';
import styles from './styles';
import firebase from '../../utils/firebase.js';
import {format} from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
    const [itemexpiry, setExpiry] = useState(new Date(item.expiry!));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const onConfirm = (selectedDate:Date) => {
        setExpiry(selectedDate);
        hideDatePicker();
    };

    const handleChange = async () => {
    try {
       const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
       const ProductRef = firebase.database().ref("Product").child(item.id);
       if(itemmaturity){
        await ProductRef.update({
           name: itemname,
           category: itemcategory,
           location: itemlocation,
           maturity: itemmaturity,
           maturitydate: now,
           expiry: format(itemexpiry,"yyyy-MM-dd'T'HH:mm")
        })
       } else {
           await ProductRef.update({
           name: itemname,
           category: itemcategory,
           location: itemlocation,
           confection: itemconfection,
           expiry: format(itemexpiry,"yyyy-MM-dd'T'HH:mm")
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
                    <Button title="Select Expiry Date" onPress={showDatePicker} />
                    <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={onConfirm}
                    onCancel={hideDatePicker}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleChange}>
                    <Text style={styles.buttonText}>Add Changes</Text>
                    </TouchableOpacity>
        </View>}
</View>)
}

export default Modal;