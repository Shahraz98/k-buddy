import React from 'react';
import {Text,Image,Button} from 'react-native';
import mystyle from '../../../constants/mystyle';
import Colors from '../../../constants/Colors';
import {ScannerProps} from '../../../types';
import { BarCodeScanner } from 'expo-barcode-scanner';


const MyScanner = ({handleScanning, handleClosing}:ScannerProps) => {
    
    return (
        <>
        <BarCodeScanner onBarCodeScanned={handleScanning} style={{top: -155,height: '200%', width: '100%', position: 'absolute', zIndex: 100}}>
        <Text style={[mystyle.myScannerText, mystyle.centered, mystyle.whiteText]}>Scan Bar Code</Text>
        <Button color={Colors.light.background} title={'Close'} onPress={handleClosing}></Button>
        <Image style={[mystyle.centered, mystyle.myScannerImg]} source={require('../../../assets/images/scan.png')}/>
        </BarCodeScanner>
        </>
    )
}

export default MyScanner;