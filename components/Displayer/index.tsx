import React from 'react';
import {View} from 'react-native';
import Colors from '../../constants/Colors';
import Row from '../Row';
import {DisplayerProps} from '../../types';
import mystyle from '../../constants/mystyle';
import Warning from '../Warning';

const Displayer = ({items, text, colored}: DisplayerProps) => {

return (
<>
<View>
   {items.length != 0?
     items.map((product) => <Row key={product.id} item={product}/>)
     : <View style={[mystyle.centered, {marginVertical: 50}]}><Warning 
     positive={true} 
     subColor={colored? Colors.light.tint : Colors.light.gray} 
     iconColor={colored? Colors.light.tint : Colors.light.gray} 
     subText={text}></Warning></View>
}
</View>
</>
)}

export default Displayer;