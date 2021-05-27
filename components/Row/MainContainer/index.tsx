import React, {useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import { RowProps} from '../../../types';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from '../../Modal';
import RowTop from './RowTop';
import RowMid from './RowMid';
import RowBot from './RowBot';

const MainContainer = ({product}: RowProps) => {
const [modal, OpenModal] = useState<boolean>(true);

const handleEdit = () => {
   OpenModal(!modal);
}

const gradient = { uri: "https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-076-premium-dark.png" };

return (
<>
{modal?

<View style={styles.container}>
<View key={product.id} style={styles.block}>
<ImageBackground source={gradient} style={{width: '100%'}} imageStyle={{ borderRadius: 15}}>
<View style={styles.wrapper}>
<RowTop product={product}></RowTop>
<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
<RowBot product={product}></RowBot>
<View>
<RowMid product={product}></RowMid>
<TouchableOpacity style={styles.editbtn} onPress={handleEdit}>
            <Text style={styles.editText} >Edit</Text>
</TouchableOpacity>
</View>
</View>
</View>
</ImageBackground>
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