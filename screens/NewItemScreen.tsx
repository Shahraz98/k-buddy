import * as React from 'react';
import { useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import firebase from '../utils/firebase';
import { format} from 'date-fns'
import { SafeAreaView } from 'react-native-safe-area-context';
import Success from '../components/Success';
import Form from '../components/Form/index';
import { BarCodeScanner } from 'expo-barcode-scanner';
import mystyle from '../constants/mystyle';

export default function NewItemScreen() {
    const [added, setAdded] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <>
        <Text style={{fontStyle: 'italic', marginRight: 'auto', marginLeft: 'auto', marginTop: 15}}>Requesting for camera permission.</Text>
        <Text style={{fontWeight: 'bold', marginRight: 'auto', marginLeft: 'auto', marginTop: 15}}>Scanning items is only possible through camera access.</Text>
        </>;
   }

    const handleIncomingData = (name:string, brand?:string, category?:string, location?:string, confection?:string, maturity?:string, datepick?:Date) => {
        const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
        const expiry = format(datepick!,"yyyy-MM-dd'T'HH:mm");
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
                }
                else Alert.alert('Ripeness Status','Please provide a ripeness status for your fresh ingredients!');
            }
        }
        else Alert.alert('Name required','To be able to add your ingredient a name will be necessary, please fill out the first text-field.');
    }
    
    return (
    <SafeAreaView style={[mystyle.centered, mystyle.myMainWhiteBtn, {width: '100%', height: '100%'}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <ScrollView style={{flex: 0}}>
              
                {added? 
                <Success addAnother={() => setAdded(false)} 
                mainText='Item added successfully.' 
                subText='Go to the new tab to view it, or'
                buttonText='Add another'></Success>
                : <View><Form onDataReady={handleIncomingData} editor={false}></Form></View>
                }
                
            </ScrollView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}