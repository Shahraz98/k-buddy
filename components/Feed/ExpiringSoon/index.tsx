import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import { formatDistanceToNow, isAfter} from 'date-fns'
import Colors from '../../../constants/Colors';
import { ProductType, DefListProps} from '../../../types';
import mystyle from '../../../constants/mystyle';
import Displayer from '../../Displayer';

const ExpiringSoon = ({items}: DefListProps) => {
const myList:ProductType[] = items;
const words = ['hour', 'minute','second'] //Used to filter dates and determine items soon expiring
const twentyFourList = myList.filter((product) => formatDistanceToNow(new Date(product.expiry), { addSuffix: true }).indexOf(words[0]) > -1 
|| formatDistanceToNow(new Date(product.expiry), { addSuffix: true }).indexOf(words[1]) > -1
|| formatDistanceToNow(new Date(product.expiry), { addSuffix: true }).indexOf(words[2]) > -1).filter((product) => isAfter(new Date(), new Date(product.expiry)) === false)
const ripeList = myList.filter((product) => product.maturity === 'Ripe').filter((product) => isAfter(new Date(), new Date(product.expiry)) === false)
const expiredList = myList.filter((product) => isAfter(new Date(), new Date(product.expiry)) === true)

return (
<>
{myList?
<View>
    <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Expiring within 24H</Text>
    <Displayer items={twentyFourList} colored={true} text='No ingredient is going to expire within 24 hours.' shape='Square'></Displayer>
    <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Expired Ingredients</Text>
    <Displayer items={expiredList} colored={true} text='No expired Ingredients found.' shape='Expired'></Displayer> 
    <Text style={[mystyle.myHeaderText, mystyle.centered, mystyle.blackText, mystyle.stnText]}>Ripe Ingredients</Text>
    <Displayer items={ripeList} colored={true} text='No ripe Ingredients found.' shape='Short'></Displayer>
</View>
: <ActivityIndicator  style={[mystyle.centered, {marginVertical: 100}]} size="large" color={Colors.light.tint} />}
</>
)}

export default ExpiringSoon;