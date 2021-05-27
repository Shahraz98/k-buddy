import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors'


const styles = StyleSheet.create({
container: {
    flex: 1,
    marginHorizontal: 10,
},
block: {
   marginTop: 15,
   marginBottom: 10,
   paddingHorizontal:1,
   shadowColor: 'black',
   shadowOffset: {
    width: 2,
    height: 6
  },
  shadowOpacity: 0.3,
},
wrapper: {
   paddingHorizontal: 20,
   paddingVertical: 10,
},
columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
},
rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
rowHeader: {
marginTop: 5,
  flexDirection:'row',
},
blueText: {
color: 'white',
marginTop: 5,
},
name: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
},
location: {
    marginRight: 1,
    color: "#00FA9A"
},
editbtn: {
    backgroundColor: '#30303b',
    borderRadius: 30,
    width: 93,
    marginTop: 10,
    height: 35,
},
dltbtn: {
    backgroundColor: '#30303b',
    borderRadius: 30,
    width: 93,
    marginTop: 10,
    height: 35,
},
frzbtn: {
    backgroundColor: '#00FA9A',
    borderRadius: 30,
    marginTop: 10,
    width: 93,
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
    color: "#00FA9A",
    textTransform: 'uppercase',
    fontSize: 12,
},
closeText: {
    color: '#FF5733',
    textTransform: 'uppercase',
    fontSize: 12,
    marginVertical: 15,
    marginHorizontal: 35,
},

});

export default styles;