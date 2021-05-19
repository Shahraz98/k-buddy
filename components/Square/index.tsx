import React from 'react';
import {View, Text} from 'react-native';


export type SquareProps = {
proname: string,
}

const Square = ({proname}: SquareProps) => {

return (
<View style={{backgroundColor: '#FF0066', borderRadius: 15, width: 80, height: 80, marginLeft: 10, marginTop: 10}}>
    <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'white', marginTop: 'auto', marginBottom: 'auto'}}>{proname}</Text>
</View>
)}

export default Square;