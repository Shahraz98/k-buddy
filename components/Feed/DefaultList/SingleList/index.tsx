import React from 'react';
import {Text} from 'react-native';
import Row from '../../../Row';
import { DefListProps} from '../../../../types';

const SingleList = ({items}: DefListProps) => {

return (
<>
       {items ?
       items.map((product, i) => <Row key={i} item={product}/> ) 
       : <Text style={{marginRight: 'auto', marginLeft: 'auto', marginVertical: 10}}>Loading ..</Text>
       }
</>
)}

export default SingleList;