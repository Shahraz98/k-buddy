import {StyleSheet} from 'react-native';
import { preventAutoHide } from 'expo-splash-screen';


const styles = StyleSheet.create({
container: {
    flex: 1,
    marginHorizontal: 10,
},
block: {
   marginTop: 15,
   paddingBottom: 10,
   paddingHorizontal:8,
   borderRadius: 15,
   backgroundColor: '#F3F3F4',
},
rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
rowHeader: {
marginTop: 5,
  flexDirection:'row',
},
blueText: {
color: 'rgb(0,122,255)',
},
name: {
    marginRight: 5,
    fontWeight: 'bold',
},
location: {
    marginRight: 1,
},
editbtn: {
    backgroundColor: '#FF0066',
    borderRadius: 30,
    width: 74,
    height: 35,
},
dltbtn: {
    backgroundColor: '#30303b',
    borderRadius: 30,
    width: 93,
    height: 35,
},
frzbtn: {
    backgroundColor: 'rgb(0,122,255)',
    borderRadius: 30,
    width: 105,
    height: 35,
},
openbtn: {
    backgroundColor: '#30303b',
    borderRadius: 15,
    width: 74,
    height: 35,
},
editText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingVertical: 10,
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
},
closeText: {
    color: 'rgb(0,122,255)',
    textTransform: 'uppercase',
    fontSize: 12,
    marginVertical: 15,
    marginHorizontal: 35,
},

});

export default styles;