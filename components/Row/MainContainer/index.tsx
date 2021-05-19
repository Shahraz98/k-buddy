import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { ProductType } from '../../../types';
import styles from './styles';
import {ProgressBar} from 'react-native-paper';
import firebase from 'firebase';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from '../../Modal';
import { FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

export type MainContainerProps = {
product: ProductType,
}

const MainContainer = ({product}: MainContainerProps) => {
const [modal, OpenModal] = useState<boolean>(true);
const [freeze, setFreeze] = useState<boolean>(false);
const [open, setOpen] = useState<boolean>(false);

const handleEdit = () => {
   OpenModal(!modal);
}

const translateRipeness = (ripeness:string) => {
    if(ripeness === 'Underripe') return 0.1;
    if(ripeness === 'Barely Ripe') return 0.2;
    if(ripeness === 'Ripe') return 0.4;
    if(ripeness === 'Very Ripe') return 0.5;
    else return 1;
}

const translateRipenessColor = (ripeness:string) => {
    if(ripeness === 'Underripe') return '#FFCC66';
    if(ripeness === 'Barely Ripe') return '#FF9966';
    if(ripeness === 'Ripe') return '#FF6666';
    if(ripeness === 'Very Ripe') return '#FF3366';
    else return '#FF0066';
}

const ProductRef = firebase.database().ref("Product").child(product.id);

const handleDelete = async () => {
   try {await ProductRef.remove();}
   catch(error) {console.log('error',error)}
}

const handleOpen = async () => {
    try {
    setOpen(!open);
    await ProductRef.update({
     isOpen: open,
    })
 } catch(error) {console.log('error',error)}
}

const handleFreeze = async () => {
    try {const extended = moment(product.expiry).add(6,'months').format('YYYY-MM-DD hh');
    await ProductRef.update({
     expiry: extended
    })
    setFreeze(true);
 } catch(error) {console.log('error',error)}
}

const unFreeze = async () => {
  try {const unfrozen = moment(product.expiry).subtract(6,'months').format('YYYY-MM-DD hh');
   await ProductRef.update({
    expiry: unfrozen
   }) 
   setFreeze(false);}
   catch(error) {console.log('error',error)}
}

return (
<>
{modal? 
<View style={styles.container}>
<View key={product.id} style={styles.block}>
    <View style={styles.rowContainer}>
        <View style={styles.rowHeader}>
            <Text style={styles.name}>{product.name}</Text>
            <Text>({product.category})</Text>
            <Text style={styles.location}> in {product.location},</Text>
            <Text> expiring <Text style={styles.blueText}>{moment(product.expiry).fromNow()}.</Text></Text>
        </View>
    </View>
    
    <View style={styles.rowContainer}>
    <Text>Added <Text style={styles.blueText}>{moment(product.addedOn).fromNow()}</Text>.</Text>
    <Text> Confection Type: {product.confection}.</Text>
    {product.maturity?
    <View>
    <Text style={{marginTop: 5}}>Checked within {moment(product.maturitydate).fromNow()}: 
    <Text style={{color: translateRipenessColor(product.maturity)}}> {product.maturity}</Text>
    </Text>
    <ProgressBar 
    style={{backgroundColor: 'white', height: 10, width:150, borderRadius: 5, marginVertical: 10}} 
    progress={translateRipeness(product.maturity)} 
    color={translateRipenessColor(product.maturity)}/>
    </View>
    : <View></View>}
    </View>

    <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.dltbtn} onPress={handleDelete}>
            <Text style={styles.editText} >Delete</Text>
        </TouchableOpacity>
        {product.maturity?
        <View>{freeze? 
            <TouchableOpacity style={styles.frzbtn} onPress={unFreeze}>
            <Text style={styles.editText}>Unfreeze</Text>
             </TouchableOpacity>
        :  <TouchableOpacity style={styles.frzbtn} onPress={handleFreeze}>
           <Text style={styles.editText}>Freeze</Text>
            </TouchableOpacity>
        }
        </View>
        : <View></View>
        }
        <TouchableOpacity style={styles.editbtn} onPress={handleEdit}>
            <Text style={styles.editText} >Edit</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.rowContainer}>
    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>{product.name} is currently:</Text>
    </View>
    <View style={styles.rowContainer}>
        {product.isOpen?  <View style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10}}>
    <FontAwesome name="dropbox" size={65} color="black" />
    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Open</Text>
    <TouchableOpacity onPress={handleOpen}>
            <Text style={{color: '#FF0066', marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}} >Close it</Text>
        </TouchableOpacity>
        </View>
        :  <View style={{marginRight: 'auto', marginLeft: 'auto'}}>
        <MaterialCommunityIcons name="cube" size={50} color="black" />
                <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Closed</Text>
                <TouchableOpacity onPress={handleOpen}>
            <Text style={{color: 'rgb(0,122,255)', marginTop: 10}} >Open it</Text>
        </TouchableOpacity>
            </View>}
    </View>
</View>
</View> 

: <View style={styles.container}>
    <TouchableOpacity onPress={handleEdit}>
    <Text style={styles.closeText} >Close</Text>
    </TouchableOpacity>
    <Modal item={product}></Modal>
  </View>
}
</>
)}

export default MainContainer;