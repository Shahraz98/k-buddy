import React from 'react';
import {View} from 'react-native';
import Colors from '../../constants/Colors';
import Row from '../Row';
import {DisplayerProps} from '../../types';
import mystyle from '../../constants/mystyle';
import Warning from '../Warning';
import Rectangle from '../Rectangle';
import Square from '../Square';
import BoughtView from '../BoughtView';
import ExpiredView from '../ExpiredView';
import ShortView from '../ShortView';

const Displayer = ({items, text, colored, shape}: DisplayerProps) => {

return (
<View style={[{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}]}>
   {items.length != 0?
     items.map((product) => {
       if(shape === 'Square'){ return <Square key={product.id} 
       proname={product.name} prodate2={product.addedOn} prodate1={product.expiry}/>}
       else if(shape === 'Rectangle'){return <Rectangle key={product.id} proname={product.name} 
       prodate1={product.maturity!} prodate2={product.maturitydate!}/>}
       else if(shape === 'Short'){return <ShortView key={product.id} item={product} />}
       else if(shape === 'Expired'){return <ExpiredView key={product.id} item={product}/>}
       else if(shape === 'Bought'){return <BoughtView key={product.id} proname={product.name} bought={product.boughtOn!} />}
       else return <Row key={product.id} item={product}/>})
    : <View style={[mystyle.centered, {marginVertical: 50}]}>
        <Warning positive={true} subColor={colored? Colors.light.tint : Colors.light.gray} 
        iconColor={colored? Colors.light.tint : Colors.light.gray} subText={text}></Warning>
      </View>
   }
</View>
)}

export default Displayer;