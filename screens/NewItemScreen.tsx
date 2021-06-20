import * as React from 'react';
import { useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Success from '../components/Success';
import Form from '../components/Form/index';
import { BarCodeScanner } from 'expo-barcode-scanner';
import mystyle from '../constants/mystyle';
import {handleAdd} from '../utils/actions';


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
        if(name != '' && name != ' ') {
            handleAdd(name, brand, category, location, confection, maturity, datepick);
            setAdded(true);
        }
        else Alert.alert('Name required','To be able to add your ingredient a name will be necessary.');
    }
    
    return (
    <SafeAreaView style={[mystyle.centered, {width: '100%', height: '100%'}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <ScrollView style={{flex: 0}}>
              
                {added? 
                <Success addAnother={() => setAdded(false)} 
                mainText='Item added successfully.' 
                subText='Go to the new tab to view it, or'
                buttonText='Add another'></Success>
                : <View style={{marginBottom: 40}}><Form onDataReady={handleIncomingData} editor={false}></Form></View>
                }
                
            </ScrollView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}