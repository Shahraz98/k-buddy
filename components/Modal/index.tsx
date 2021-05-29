import React, {useState} from 'react';
import {View, Text} from 'react-native';
import firebase from '../../utils/firebase';
import {format} from 'date-fns';
import Form from '../Form'
import {ProductProps} from '../../types';
import mystyle from '../../constants/mystyle';

const Modal = ({item}: ProductProps) => {
    const [changed, setChanged] = useState<boolean>(false);
    
    const handleChange = async (nname?:string,nbrand?:string,ncategory?:string,nlocation?:string,nconfection?:string,nmaturity?:string, nexpiry?:Date) => {
    try {
       const now = format(new Date(),"yyyy-MM-dd'T'HH:mm");
       const ProductRef = firebase.database().ref("Product").child(item.id);
       if(nmaturity){
        await ProductRef.update({
           name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           maturity: nmaturity,
           maturitydate: now,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
        })
       } else {
           await ProductRef.update({
            name: nname,
           brand: nbrand,
           confection: nconfection,
           category: ncategory,
           location: nlocation,
           expiry: format(nexpiry!,"yyyy-MM-dd'T'HH:mm")
       })};
       setChanged(true);}
       catch(error) {console.log('error', error)}
    }

return (

<View style={[mystyle.myModalContainer, mystyle.myMainWhiteBtn]}>
    {changed? 
    <View style={{marginLeft: 25, marginTop: '50%'}}>
        <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Item changed successfully.</Text>
        <Text >You can now close this modal.</Text>
    </View> 
    : <Form onDataReady={handleChange} editor={true} product={item}></Form>
}
</View>
)}

export default Modal;