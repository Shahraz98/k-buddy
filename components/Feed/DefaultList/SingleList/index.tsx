import React from 'react';
import {View} from 'react-native';
import Row from '../../../Row';
import { DefListProps} from '../../../../types';

const SingleList = ({items}: DefListProps) => {

return (
<>
{items ?
items.map((product, i) => <Row key={i} item={product}/> ) 
: <View></View>
}
</>
)}

export default SingleList;